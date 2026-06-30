import { useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import DestinationGallery from "./components/DestinationGallery.jsx";
import DestinationDetail from "./components/DestinationDetail.jsx";
import Quiz from "./components/Quiz.jsx";
import BookingForm from "./components/BookingForm.jsx";
import Chatbot from "./components/Chatbot.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [bookingDestination, setBookingDestination] = useState(null);

  function goToBooking(destination) {
    setBookingDestination(destination);
    setSelectedDestination(null);
    setTimeout(() => {
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  return (
    <div className="bg-ink min-h-screen">
      <Header />
      <Hero />
      <DestinationGallery onSelect={setSelectedDestination} />
      <Quiz onSelectDestination={setSelectedDestination} />
      <BookingForm preselected={bookingDestination} />
      <Footer />

      <DestinationDetail
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onBook={goToBooking}
      />

      <Chatbot />
    </div>
  );
}
