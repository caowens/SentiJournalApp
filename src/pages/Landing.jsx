import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import entriesListGif from "../images/entriesListGif.gif";
import analysisGif from "../images/analysisGif.gif";
import { FAQAccordion } from "../components/FAQAccordion";
import { ContactForm } from "../components/ContactForm";

export function Landing() {
  return (
    <>
      <div className="landing">
        <div className="header">
          SentiJournal
          <ul className="header-links">
            <li className="about-us">
              <a href="">About Us</a>
            </li>
            <li className="contact">
              <a href="#contact-section">Contact</a>
            </li>
            <li className="contact">
              <a href="#faq-section">FAQs</a>
            </li>
          </ul>
          <ul className="header-buttons">
            <Button variant="outlined" className="header-login">
              <Link to={"/login"}>Log in</Link>
            </Button>
            <Button className="header-signup">
              <Link to={"/signup"}>Sign Up</Link>
            </Button>
          </ul>
        </div>

        <div className="main-section section">
          <div className="intro">
            <div className="hero-main">
              Discover your emotions with <br></br>{" "}
              <h1 className="hero-main-title">SentiJournal</h1>
            </div>
            <div className="hero-secondary">
              SentiJournal uses advanced sentiment analysis to track and
              visualize your emotional journey through journaling. Gain insights
              into your feelings and see how they evolve over time.
            </div>
            <div className="get-started-section">
              <Button className="get-started-btn"><a href="#discover-section">Get Started</a></Button>
              <Button variant="outlined" className="learn-more-btn">
                <a href="#faq-section">Learn More</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="discover-section section" id="discover-section">
          <div className="discover-intro">
            <div className="discover-main">
              Uncover the <span className="emotions">emotions</span> in{" "}
              <br></br> your journal entries
            </div>
            <div className="discover-secondary">
              SentiJournal utilizes advanced sentiment analysis models to
              categorize and score the emotions expressed in your journal
              entries. SentiJournal enhances your journaling experience by
              displaying a snapshot of the emotional tone next to each entry in
              your list, giving you instant insight into the sentiments captured
              in your journaling journey.
            </div>
          </div>
          <img src={entriesListGif} alt="Gif of Home Page with Entries List" />
        </div>

        <div className="visualize-section section">
          <div className="visualize-intro">
            <div className="visualize-main">
              Visualize Your Emotions with SentiJournal
            </div>
            <div className="visualize-secondary">
              Discover how your emotions evolve over time with SentiJournal's
              unique emotion tracking graph. Gain insights into your emotional
              well-being and understand the factors that influence your mood.
              Start journaling today and see the power of tracking your
              emotions.
            </div>
            <img src={analysisGif} alt="Gif of Sentiment Analysis graph in action" />
          </div>
        </div>

        <div className="faq-section section" id="faq-section">
          <div className="faq-intro">
            <div className="faq-main">Frequently Asked Questions</div>
            <div className="faq-secondary">
              Find answers to common questions about SentiJournal's features,
              privacy policy, and use cases.
            </div>
            <Button className="faq-contact-btn">
              <a href="#contact-section">Contact</a>
            </Button>
          </div>
          <div className="faq-questions-container">
            <div className="faq-questions">
              <ul>
                <li className="faq-card">
                  <FAQAccordion
                    header="What is SentiJournal?"
                    description="SentiJournal is a digital journal that uses sentiment analysis models to provide a sentiment label and score for each journal entry. It also displays a graph showing how your emotions have changed over time."
                  />
                </li>
                <li className="faq-card">
                  <FAQAccordion
                    header="How does it work?"
                    description="SentiJournal uses adavanced sentiment analysis algorithms to analyze the text of your journal entries. It then assigns a sentiment label (postive, negative, or neutral) and a corresponding score. The journal entries and sentiment scores are dipslayed in a graph, allowing you to track your emotional journey over time."
                  />
                </li>
                <li className="faq-card">
                  <FAQAccordion
                    header="Is my data private?"
                    description="Yes, we take your privacy seriously. SentiJournal securely stores your journal entries and sentiment data. We do not share your personal information with third parties without your consent. For more information, please refer to our privacy policy."
                  />
                </li>
                <li className="faq-card">
                  <FAQAccordion
                    header="Who can use SentiJournal?"
                    description="SentiJournal is designed for anyone who wants to track and understand their emotions through journaling. It can be used by individuals, therapists, and researchers to gain insights into emotional well-being and patterns."
                  />
                </li>
                <li className="faq-card">
                  <FAQAccordion
                    header="How can I get started?"
                    description="To get started with SentiJournal, simply sign up for an account on our website. Once you're signed in, you can start journaling and exploring the sentiment analysis features. Start your emotional journey today!"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="contact-section section" id="contact-section">
          <div className="contact-intro">
            <div className="contact-main">Contact SentiJournal</div>
            <div className="contact-secondary">
              Have a question or need support? We're here to help!
            </div>
          </div>
          <div className="contact-form-container">
            <ContactForm />
          </div>
        </div>

        <footer className="footer-section">
          <div className="copyright">© 2024 SentiJournal</div>
          <ul className="footer-links">
            <li>About Us</li>
            <li>
              <a href="#contact-section">Contact Us</a>
            </li>
            <li>
              <a href="#faq-section">FAQs</a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
