import React, { useState, useRef } from "react";
import "./Startpage.css";

function Startpage() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedStyleButton, setSelectedStyleButton] = useState(null);
  const [selectedLanguageButton, setSelectedLanguageButton] = useState(null);

  const [affectPreviewStyle, setAffectPreviewStyle] = useState(false);
  const [affectPreviewFormat, setAffectPreviewFormat] = useState(false);

  function handleStyleDoneClick() {
    setAffectPreviewStyle(true);
    if (selectedFormat && selectedStyleButton && isUploaded) {
      setIsSpinnerActive(true);
      setTimeout(() => {
        setIsSpinnerActive(false);
      }, 1500);
    }
  }

  function handleFormatDoneClick() {
    setAffectPreviewFormat(true);
    if (selectedFormat && selectedStyleButton && isUploaded === true) {
      setIsSpinnerActive(true);
      setTimeout(() => {
        setIsSpinnerActive(false);
      }, 1000);
    }
  }

  const [isSpinnerActive, setIsSpinnerActive] = useState(false);

  // Function to handle button click

  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const [showFormatModal, setShowFormatModal] = useState(false);

  function forceLanguageModal() {
    setShowLanguageModal(true);
    setShowFormatModal(false);
  }

  function forceFormatModal() {
    setShowFormatModal(true);
  }

  function forceStyleModal() {
    setShowLanguageModal(false);
    setShowFormatModal(false);
  }

  const [isUploaded, setIsUploaded] = useState(false);

  const buttons = [
    { id: 1, text: "Summary", image: "/summary.svg", bg: "#E2ECFF" },
    { id: 2, text: "Presentation", image: "/presentation.svg", bg: "#F0E4FF" },
    { id: 3, text: "Flyer", image: "/flyer.svg", bg: "#F1FFFC" },
    { id: 4, text: "Worksheet", image: "/worksheet.svg", bg: "#FEFFEE" },
  ];

  const selectedFormat = buttons.find(
    (button) => button.id === selectedButton
  )?.text;

  const styleButtons = [
    { id: 1, text: "Business", image: "/business.svg", bg: "#EEF8FF" },
    { id: 2, text: "Education", image: "/education.svg", bg: "#F4FFDE" },
    { id: 3, text: "Minimalistic", image: "/minimalistic.svg", bg: "#FFF8EE" },
    { id: 4, text: "Aesthetic", image: "/aesthetic.svg", bg: "#EDE8FF" },
  ];

  const languageButtons = [
    { id: 1, text: "English", image: "/lang.svg", bg: "#FCFCFD" },
    { id: 2, text: "German", image: "/lang.svg", bg: "#FCFCFD" },
    { id: 3, text: "Arabic", image: "/lang.svg", bg: "#FCFCFD" },
    { id: 4, text: "French", image: "/lang.svg", bg: "#FCFCFD" },
  ];

  const handleButtonClick = (id) => {
    setSelectedButton(id);
  };

  const handleStyleButtonClick = (id) => {
    setSelectedStyleButton(id);
  };

  const handleLanguageButtonClick = (id) => {
    setSelectedLanguageButton(id);
  };

  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg", // JPEG images (includes .jpg and .jpeg)
      "text/plain", // Plain text files
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/msword", // .doc
    ];

    if (file && allowedTypes.includes(file.type)) {
      setFileName(file.name);
      setIsUploaded(true);
    } else {
      setFileName("");
      setIsUploaded(false);
    }
  };

  // Trigger file input click
  const handleButtonFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [modalClassName, setModalClassName] = useState("modal");
  const [finishModalClassName, setFinishModalClassName] =
    useState("finishModal");
  const [overlayClassName, setOverlayClassName] = useState("");
  const [finishOverlayClassName, setFinishOverlayClassName] = useState("");

  function toggleModal() {
    if (modalClassName === "modal") {
      setModalClassName("modal modalOpen");
      setOverlayClassName("overlay");
    } else {
      setModalClassName("modal");
      setOverlayClassName("");
    }
  }

  function toggleFinishModal() {
    if (isUploaded && selectedStyleButton && selectedButton) {
      if (finishModalClassName === "finishModal") {
        setFinishModalClassName("finishModal createModalOpen");
        setFinishOverlayClassName("finishOverlay");
      } else {
        setFinishModalClassName("finishModal");
        setFinishOverlayClassName("");
      }
    }
  }

  const [loaded, setLoaded] = useState(false);

  if (isUploaded && selectedStyleButton && selectedButton) {
    setTimeout(() => {
      setLoaded(true);
    }, 1500);
  }

  const renderSelectedImage = () => {
    switch (selectedButton) {
      case 1:
        return "/spread.png";
      case 2:
        if (selectedStyleButton === 1) {
          return "/spread.png";
        } else if (selectedStyleButton === 2) {
          return "2.png";
        } else if (selectedStyleButton === 3) {
          return "3.png";
        } else if (selectedStyleButton === 4) {
          return "4.png";
        }
      case 3:
        return "/spread.png";
      case 4:
        return "/spread.png";
    }
  };

  return (
    <>
      <div className="topContainer">
        <h1 className="topContainerHeading">Locker</h1>
        <button
          onClick={toggleFinishModal}
          className={`topContainerButton createButton ${
            isUploaded &&
            selectedStyleButton &&
            selectedButton &&
            selectedLanguageButton
              ? "active"
              : ""
          }`}
        >
          Create
        </button>
      </div>
      <section id="previewSection">
        <div className="buttonContainerTopRow">
          <div
            className="selectorsButton styleButton"
            onClick={() => {
              forceStyleModal();
              toggleModal();
            }}
          >
            {selectedStyleButton && affectPreviewStyle ? (
              <img src="/hayken.svg" className="haken active" />
            ) : (
              <img src="/hayken.svg" className="haken" />
            )}
            <div className="svgContainer styleSvg">
              <img src="/sparklesnew.svg" alt="Style" />
            </div>
            <div className="uploadTextContainer">
              <p className="selectorsText">Style</p>
              <p className="selectorsSLtext">
                {selectedStyleButton && affectPreviewStyle
                  ? styleButtons.find(
                      (button) => button.id === selectedStyleButton
                    ).text
                  : ""}
              </p>
            </div>
          </div>
          <div
            className="selectorsButton languageButton"
            onClick={() => {
              forceLanguageModal();
              toggleModal();
            }}
          >
            {selectedLanguageButton ? (
              <img src="/hayken.svg" className="haken active" />
            ) : (
              <img src="/hayken.svg" className="haken" />
            )}
            <div className="svgContainer styleSvg">
              <img src="/lang.svg" alt="Language" />
            </div>
            <div className="uploadTextContainer">
              <p className="selectorsText">Language</p>
              <p className="selectorsSLtext">
                {selectedLanguageButton
                  ? languageButtons.find(
                      (languageButton) =>
                        languageButton.id === selectedLanguageButton
                    ).text
                  : ""}
              </p>
            </div>
          </div>
        </div>
        <div className="formatLoading">
          {loaded ? (
            <div className="container">
              <img src={renderSelectedImage()} alt="Preview" />
            </div>
          ) : (
            <div className="container">
              <div className="prevBox">
                <p>
                  Upload your Document <br /> & transform it into{" "}
                  <span>WOW.</span>
                </p>
              </div>
            </div>
          )}
          <img
            src="/loading.svg"
            alt="loading..."
            className={`loadingCircle ${isSpinnerActive ? "active" : ""}`}
          />
        </div>
        <div className="buttonContainerBottomRow">
          <div
            className="selectorsButton formatButton"
            onClick={() => {
              forceFormatModal();
              toggleModal();
            }}
          >
            {selectedFormat && affectPreviewFormat ? (
              <img src="/hayken.svg" className="haken active" />
            ) : (
              <img src="/hayken.svg" className="haken" />
            )}
            <div className="svgContainer styleSvg">
              <img src="/easel.svg" alt="Format" />
            </div>
            <div className="uploadTextContainer">
              <p className="selectorsText">Format</p>
              <p className="selectorsSLtext">
                {selectedButton && affectPreviewFormat
                  ? buttons.find((button) => button.id === selectedButton).text
                  : ""}
              </p>
            </div>
          </div>
          <input
            type="file"
            accept="application/pdf, image/png, image/jpeg, text/plain, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword" // Accept PDF, PNG, JPG, JPEG, TXT, DOC, and DOCX files
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <div
            className="selectorsButton uploadButton"
            onClick={handleButtonFileClick}
          >
            {isUploaded ? (
              <img src="/hayken.svg" className="haken active" />
            ) : (
              <img src="/hayken.svg" className="haken" />
            )}
            <div className="svgContainer styleSvg">
              <img src="/upload.svg" alt="Upload" />
            </div>
            <div className="uploadTextContainer">
              <p className="selectorsText">Document</p>
              {isUploaded ? (
                <p className="selectorsSLtext uploadedText">{fileName}</p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </section>
      <img src="/loading.svg" alt="loading..." className="loadingCircle" />
      <section id="footer"></section>
      <div className={overlayClassName} onClick={toggleModal} />
      <div className={modalClassName}>
        {!showLanguageModal && !showFormatModal ? (
          <>
            <button
              className="doneButton"
              onClick={() => {
                toggleModal();
                handleStyleDoneClick();
              }}
            >
              Done
            </button>
            <p className="paragraphHeading">Style</p>
            <p className="styleDes">Choose a style for your presentation.</p>

            <div className="styleSelectorButtonContainer">
              {styleButtons.map((styleButton) => (
                <div className="styleButtonContainer" key={styleButton.id}>
                  <div
                    className={
                      selectedStyleButton === styleButton.id
                        ? "btnConE active"
                        : "btnConE"
                    }
                  >
                    <button
                      style={{ backgroundColor: styleButton.bg }}
                      onClick={() => handleStyleButtonClick(styleButton.id)}
                    >
                      <img src={styleButton.image} className="prev" />
                    </button>
                  </div>
                  {selectedStyleButton === styleButton.id && (
                    <img src="/blackhaken.svg" className="ok" />
                  )}
                  <p className="buttonConText">{styleButton.text}</p>
                </div>
              ))}
            </div>
          </>
        ) : showLanguageModal && !showFormatModal ? (
          <>
            <button className="doneButton" onClick={toggleModal}>
              Done
            </button>
            <p className="paragraphHeading">Language</p>
            <p className="styleDes">Choose a language for your presentation.</p>
            <div className="styleSelectorButtonContainer">
              {languageButtons.map((languageButton) => (
                <div className="styleButtonContainer" key={languageButton.id}>
                  <div
                    className={
                      selectedLanguageButton === languageButton.id
                        ? "btnConE active"
                        : "btnConE"
                    }
                  >
                    <button
                      style={{ backgroundColor: languageButton.bg }}
                      onClick={() =>
                        handleLanguageButtonClick(languageButton.id)
                      }
                    >
                      <img src={languageButton.image} className="prev" />
                    </button>
                  </div>
                  {selectedLanguageButton === languageButton.id && (
                    <img src="/blackhaken.svg" className="ok" />
                  )}
                  <p className="buttonConText">{languageButton.text}</p>
                </div>
              ))}
            </div>
          </>
        ) : showFormatModal ? (
          <>
            <button
              className="doneButton"
              onClick={() => {
                toggleModal();
                handleFormatDoneClick();
              }}
            >
              Done
            </button>
            <p className="paragraphHeading">Format</p>
            <p className="styleDes">Choose a format for your presentation.</p>
            <div className="styleSelectorButtonContainer">
              {buttons.map((button) => (
                <div className="styleButtonContainer" key={button.id}>
                  <div
                    className={
                      selectedButton === button.id
                        ? "btnConE active"
                        : "btnConE"
                    }
                  >
                    <button
                      style={{ backgroundColor: button.bg }}
                      onClick={() => handleButtonClick(button.id)}
                    >
                      <img src={button.image} className="prev" />
                    </button>
                  </div>
                  {selectedButton === button.id && (
                    <img src="/blackhaken.svg" className="ok" />
                  )}
                  <p className="buttonConText">{button.text}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      <div className={finishOverlayClassName} onClick={toggleFinishModal} />
      <div className={finishModalClassName}>
        <button className="closeButton" onClick={toggleFinishModal}>
          <img src="/x.svg" alt="x" />
        </button>
        <div className="imgContainer">
          <img src="./bdrprs.png" alt="Result" />
        </div>
        <p className="firstParagraph">
          Your Presentation <br />
          <span>is ready</span>
        </p>
        <p className="downloadText">Download now</p>
        <button className="downloadButton">
          <img src="/cloud.svg" alt="Download" />
          <p className="downloadText">Download</p>
        </button>
        <p className="downloadDes">
          Your pdf document has been transformed into a brand new presentation.
        </p>
      </div>
    </>
  );
}

export default Startpage;
