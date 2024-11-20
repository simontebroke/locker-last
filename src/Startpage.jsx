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
    setIsSpinnerActive(true);
    setTimeout(() => {
      setIsSpinnerActive(false);
    }, 1500);
  }

  function handleFormatDoneClick() {
    setAffectPreviewFormat(true);
    setIsSpinnerActive(true);
    setTimeout(() => {
      setIsSpinnerActive(false);
    }, 1500);
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
    { id: 1, text: "Summary" },
    { id: 2, text: "Presentation" },
    { id: 3, text: "Flyer" },
    { id: 4, text: "Worksheet" },
  ];

  const selectedFormat = buttons.find(
    (button) => button.id === selectedButton
  )?.text;

  const styleButtons = [
    { id: 1, text: "Business", image: "/business.svg" },
    { id: 2, text: "Education", image: "/education.svg" },
    { id: 3, text: "Minimalistic", image: "/minimalistic.svg" },
    { id: 4, text: "Aesthetic", image: "/aesthetic.svg" },
  ];

  const languageButtons = [
    { id: 1, text: "English" },
    { id: 2, text: "German" },
    { id: 3, text: "Arabic" },
    { id: 4, text: "French" },
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
    if (
      isUploaded &&
      selectedStyleButton &&
      selectedButton &&
      selectedLanguageButton
    ) {
      if (finishModalClassName === "finishModal") {
        setFinishModalClassName("finishModal createModalOpen");
        setFinishOverlayClassName("finishOverlay");
      } else {
        setFinishModalClassName("finishModal");
        setFinishOverlayClassName("");
      }
    }
  }

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
        <div className="imgContainer">
          <img src="/spread.png" alt="Preview" />
        </div>
        <img
          src="/loading.svg"
          alt="loading..."
          className={`loadingCircle ${isSpinnerActive ? "active" : ""}`}
        />
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
                      onClick={() =>
                        handleLanguageButtonClick(languageButton.id)
                      }
                    >
                      <img src="/haken.svg" className="prev" />
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
                    <button onClick={() => handleButtonClick(button.id)}>
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
