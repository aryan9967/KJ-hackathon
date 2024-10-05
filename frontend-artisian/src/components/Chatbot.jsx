import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import { speakText } from "../speech";
import AIicon from "../../public/Animation - 1723745985736.webm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSearchResult } from "@/context/SearchContext";

export default function Chatbot() {
  const [transcript1, setTranscript] = useState(null);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef(transcript1);
  const accumulatedTranscriptRef = useRef("");
  const chatStatusref = useRef(false);
  const loopref = useRef(false);
  const navigate = useNavigate();
  const [chatVisibility, setChatVisibility] = useState(false);
  const { storeSearchResult } = useSearchResult();
  const location = useRef();
  const [chatContent, setChatContent] = useState(
    "Hello, I am CareMate, your personal care taking assistant. How may I assist you?"
  );
  // Update the ref whenever transcript1 changes
  useEffect(() => {
    async function getCoordinates() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position.coords.latitude, position.coords.longitude);
            location.current = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
          },
          (err) => {
            console.error(err.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }

    getCoordinates();
  }, []);

  useEffect(() => {
    transcriptRef.current = transcript1;
  }, [transcript1]);

  useEffect(() => {
    const chatStatus = localStorage.getItem("chatActive");
    chatStatusref.current = chatStatus;
    console.log(chatStatus);
    // if (chatStatus) {
    //   const AIbutton = document.getElementById("AIbutton");
    //   AIbutton.click();
    // }
  }, []);

  const startChat = () => {
    socket.connect();

    socket.on("connect", () => {
      console.log(socket.id);
    });

    const textToSpeak =
      "Hello, I am CareMate, your care taking assistant. How may I assist you?";

    if (window.location.pathname === "/" && chatStatusref.current) {
      speakText(textToSpeak);
    }

    startRecognition();
  };

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true; // Keep recognizing speech until stopped
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        console.log(result);
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
          setTimeout(() => {
            recognitionRef.current.stop();
            console.log("stopped by timeout");
          }, 2500);
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      // Update the ref with the latest final transcript
      accumulatedTranscriptRef.current += finalTranscript;

      // For interim results, append to the current accumulated transcript
      setTranscript(accumulatedTranscriptRef.current + interimTranscript);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      console.log(accumulatedTranscriptRef.current); // State value might not be updated yet
      if (accumulatedTranscriptRef.current) {
        console.log(accumulatedTranscriptRef.current);
        setChatContent(accumulatedTranscriptRef.current);
        socket.emit("prompt", accumulatedTranscriptRef.current);
      }
      accumulatedTranscriptRef.current = "";
      setTranscript(accumulatedTranscriptRef.current);
      if (loopref.current) {
        startRecognition();
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    recognitionRef.current = recognition;

    // return () => {
    //   if (recognitionRef.current) {
    //     recognitionRef.current.stop();
    //   }
    // };
  }, []);

  async function add_to_cart(product_name) {
    const last_index = product_name.indexOf(`\\`);
    const new_product_name = String(product_name.slice(0, last_index).trim());
    const { data } = await axios.post("http://localhost:3000/add_to_cart", {
      product_name: new_product_name,
    });
    console.log(data);
    speakText(data);
    setChatContent(data);
  }

  async function add_to_wishlist(product_name) {
    const last_index = product_name.indexOf(`\\`);
    const new_product_name = String(product_name.slice(0, last_index).trim());
    const { data } = await axios.post("http://localhost:3000/add_to_wishlist", {
      product_name: new_product_name,
    });
    console.log(data);
    speakText(data);
    setChatContent(data);
  }

  async function book_appointment(req_data) {
    console.log("appointment data", req_data);
    const { doctor_id, doctor_name, date, time } = req_data;
    const { data } = await axios.post("http://localhost:3000/add_appointment", {
      doctor_id,
      doctor_name,
      date,
      time,
    });
    console.log(data);
    speakText(data.message);
  }

  async function handle_emergency() {
    console.log("emergency detected");
    console.log(location.current);
    const { data } = await axios.post("http://localhost:3000/send-SOS", {
      location: location.current,
    });
    console.log(data);
    speakText("Contacted your family member and nearby emergency services");
  }

  async function add_todo(title) {
    const { data } = await axios.post("http://localhost:3000/add_todo", {
      title,
    });
    console.log(data);
    speakText(data.message);
  }

  async function add_medication(req_data) {
    console.log("medication data", req_data);
    const { frequency, medicine_name } = req_data;
    const { data } = await axios.post("http://localhost:3000/add_medication", {
      frequency,
      name: medicine_name,
    });
    console.log(data);
    speakText(data.message);
  }

  async function hire_caregiver(id) {
    const { data } = await axios.post("http://localhost:3000/hire_caregiver", {
      care_giver_id: id,
    });
    console.log(data);
    speakText(data);
  }

  useEffect(() => {
    const handleResponse = (response) => {
      console.log(response);

      const first_index = response.indexOf(`{`);
      const last_index = response.lastIndexOf(`}`);
      if (first_index > -1 && last_index > -1) {
        const json_extract = response.slice(first_index, last_index + 1);
        const response_json = JSON.parse(json_extract);
        if (
          response_json.operation &&
          response_json.operation.toLowerCase() == "appointment"
        ) {
          book_appointment(response_json);
          return;
        } else if (
          response_json.operation &&
          response_json.operation.toLowerCase() == "medication"
        ) {
          add_medication(response_json);
        }
      }

      if (first_index > -1 && last_index > -1) {
        const json_extract = response.slice(first_index, last_index + 1);
        const response_json = JSON.parse(json_extract);
        console.log(response_json);
        localStorage.setItem("search_result", JSON.stringify(response_json));
        storeSearchResult(response_json);
        navigate("/searchresult");
        speakText(response_json.summary);
        setChatContent(response_json.summary);
        return;
      }

      const SOS = "SOS";
      if (response.indexOf(SOS) > -1) {
        handle_emergency();
        return;
      }

      if (response.toLowerCase().indexOf("add_todo") > -1) {
        // Slice the ADD_TODO command and get the title
        const title = response.replace("ADD_TODO", "").trim();
        console.log(title); // This will give you the remaining part of the response after removing "ADD_TODO"
        add_todo(title);
        return;
      }

      if (response.toLowerCase().indexOf("hire") > -1) {
        const lower_case_response = response.toLowerCase();
        console.log(lower_case_response);
        const care_giver_id = lower_case_response.replace("hire", "").trim();
        console.log(care_giver_id); // This will give you the remaining part of the response after removing "ADD_TODO"
        hire_caregiver(care_giver_id);
        return;
      }

      const parts = response.split(" ");
      if (parts[0].toLowerCase() === "cart") {
        console.log(response.slice(5));
        add_to_cart(response.slice(5));
        return;
      }

      if (parts[0].toLowerCase() === "wishlist") {
        console.log(response.slice(9));
        add_to_wishlist(response.slice(9));
        return;
      }
      let pagename;

      // If the command starts with "open", process it
      if (parts[0].toLowerCase() === "open") {
        // Join the remaining parts, normalize by removing spaces and converting to lowercase
        pagename = parts.slice(1).join(" ").replace(/\s+/g, "").toLowerCase();

        console.log(pagename);

        // Define a mapping of possible variations to correct routes
        const pageRoutes = {
          home: "/",
          homepage: "/",
          wishlist: "/wishlist",
          wishlistpage: "/wishlist",
          cart: "/cart",
          cartpage: "/cart",
          dashboard: "/dashboard",
          dashboardpage: "/dashboard",
          community: "/community",
          communitypage: "/community",
          caregiver: "/caregiver",
          caregiverpage: "/caregiver",
          doctor: "/doctor",
          doctorpage: "/doctor",
          medicalrecords: "/medical",
          medicalrecordspage: "/medical",
        };

        // Check if the normalized page name exists in the mapping
        if (pageRoutes[pagename]) {
          speakText(`opening ${pagename}`);
          navigate(pageRoutes[pagename]);
        } else {
          speakText("Invalid page name");
        }
      } else {
        setChatContent(response);
        speakText(response);
      }
      startRecognition();
    };

    socket.on("response", handleResponse);

    return () => {
      socket.off("response", handleResponse); // Clean up the listener
    };
  }, []);

  const startRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  return (
    <>
      <button
        className="button AIbutton"
        id="AIbutton"
        onClick={() => {
          if (!loopref.current) {
            startChat();
            localStorage.setItem("chatActive", "true");
            setChatVisibility(true);
          } else {
            localStorage.setItem("chatActive", "false");
          }
          loopref.current = !loopref.current;
        }}
      >
        <video src={AIicon} alt="AI Icon Video" autoPlay muted loop />
      </button>
      {chatVisibility ? (
        <div className="output-div" id="output-div">
          <button
            className="close_btn"
            onClick={() => {
              setChatVisibility(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>

          <p>{chatContent ? chatContent : null}</p>
        </div>
      ) : null}
    </>
  );
}
