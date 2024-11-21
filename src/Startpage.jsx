import React, { useState, useRef, useEffect } from "react";
import "./Startpage.css";

function Startpage() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedStyleButton, setSelectedStyleButton] = useState(null);
  const [selectedLanguageButton, setSelectedLanguageButton] = useState(null);

  const [affectPreviewStyle, setAffectPreviewStyle] = useState(false);
  const [affectPreviewFormat, setAffectPreviewFormat] = useState(false);

  const [tempSelectedStyleButton, setTempSelectedStyleButton] = useState(null);

  const [tempSelectedFormatButton, setTempSelectedFormatButton] =
    useState(null);

  const [tempSelectedLanguageButton, setTempSelectedLanguageButton] =
    useState(null);

  const handleTempStyleButtonClick = (id) => {
    setTempSelectedStyleButton(id);
  };

  const handleTempLanguageButtonClick = (id) => {
    setTempSelectedLanguageButton(id);
  };

  const handleTempFormatButtonClick = (id) => {
    setTempSelectedFormatButton(id);
  };

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
    { id: 2, text: "Presentation", image: "/presi.svg", bg: "#F0E4FF" },
    { id: 3, text: "Flyer", image: "/flyer.svg", bg: "#F1FFFC" },
    { id: 4, text: "Worksheet", image: "/worksheet.svg", bg: "#FEFFEE" },
  ];

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

  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const selectedFormat = buttons.find(
    (button) => button.id === selectedButton
  )?.text;
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

  const [previewClassName, setPreviewClassName] = useState("");

  const renderSelectedImage = () => {
    switch (selectedButton) {
      case 1:
        return { imagePath: "/summary.png", className: "summary" };
      case 2:
        if (selectedStyleButton === 1) {
          return { imagePath: "/spread.png", className: "presentationInit" };
        } else if (selectedStyleButton === 2) {
          return { imagePath: "/2.png", className: "presentation" };
        } else if (selectedStyleButton === 3) {
          return { imagePath: "/3.png", className: "presentation" };
        } else if (selectedStyleButton === 4) {
          return { imagePath: "/4.png", className: "presentation" };
        }
        break;
      case 3:
        if (selectedStyleButton === 1) {
          return { imagePath: "/flyer1.png", className: "flyer" };
        } else if (selectedStyleButton === 2) {
          return { imagePath: "/flyer2.png", className: "flyer" };
        } else if (selectedStyleButton === 3) {
          return { imagePath: "/flyer3.png", className: "flyer" };
        } else if (selectedStyleButton === 4) {
          return { imagePath: "/flyer4.png", className: "flyer" };
        }
        break;
      case 4:
        return { imagePath: "/worksheet.png", className: "worksheet" };
      default:
        return null;
    }
  };

  // Usage in JSX
  const selectedImage = renderSelectedImage();

  function handleStyleDoneClick() {
    if (tempSelectedStyleButton !== null) {
      setSelectedStyleButton(tempSelectedStyleButton);
      setAffectPreviewStyle(true);

      if (selectedButton && isUploaded) {
        setIsSpinnerActive(true);
        setTimeout(() => {
          setIsSpinnerActive(false);
        }, 1500);
      }
    }
  }

  function handleFormatDoneClick() {
    if (tempSelectedFormatButton !== null) {
      setSelectedButton(tempSelectedFormatButton);
      setAffectPreviewFormat(true);

      if (selectedStyleButton && isUploaded === true) {
        setIsSpinnerActive(true);
        setTimeout(() => {
          setIsSpinnerActive(false);
        }, 1500);
      }
    }
  }

  function handleLanguageDoneClick() {
    if (tempSelectedLanguageButton !== null) {
      setSelectedLanguageButton(tempSelectedLanguageButton);
      if (selectedStyleButton && isUploaded === true && selectedButton) {
        setIsSpinnerActive(true);
        setTimeout(() => {
          setIsSpinnerActive(false);
        }, 1000);
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
            isUploaded && selectedStyleButton && selectedButton ? "active" : ""
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
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_698_102)">
                  <path
                    d="M15.3572 14.3359L13.2417 8.83608C13.2099 8.75355 13.1539 8.68257 13.081 8.63251C13.0081 8.58245 12.9218 8.55565 12.8333 8.55565C12.7449 8.55565 12.6585 8.58245 12.5857 8.63251C12.5128 8.68257 12.4567 8.75355 12.425 8.83608L10.3094 14.3359C10.2875 14.3931 10.2537 14.445 10.2105 14.4883C10.1672 14.5316 10.1153 14.5653 10.0581 14.5873L4.55826 16.7028C4.47573 16.7346 4.40475 16.7906 4.35469 16.8635C4.30463 16.9364 4.27783 17.0227 4.27783 17.1112C4.27783 17.1996 4.30463 17.2859 4.35469 17.3588C4.40475 17.4317 4.47573 17.4877 4.55826 17.5195L10.0581 19.635C10.1153 19.657 10.1672 19.6907 10.2105 19.734C10.2537 19.7773 10.2875 19.8292 10.3094 19.8864L12.425 25.3862C12.4567 25.4688 12.5128 25.5397 12.5857 25.5898C12.6585 25.6399 12.7449 25.6667 12.8333 25.6667C12.9218 25.6667 13.0081 25.6399 13.081 25.5898C13.1539 25.5397 13.2099 25.4688 13.2417 25.3862L15.3572 19.8864C15.3792 19.8292 15.4129 19.7773 15.4562 19.734C15.4995 19.6907 15.5514 19.657 15.6085 19.635L21.1084 17.5195C21.1909 17.4877 21.2619 17.4317 21.312 17.3588C21.362 17.2859 21.3888 17.1996 21.3888 17.1112C21.3888 17.0227 21.362 16.9364 21.312 16.8635C21.2619 16.7906 21.1909 16.7346 21.1084 16.7028L15.6085 14.5873C15.5514 14.5653 15.4995 14.5316 15.4562 14.4883C15.4129 14.445 15.3792 14.3931 15.3572 14.3359ZM8.13815 4.92497C8.03251 4.88434 7.94903 4.80086 7.9084 4.69522L7.37334 3.30405C7.24185 2.96218 6.75815 2.96218 6.62666 3.30405L6.0916 4.69522C6.05097 4.80086 5.96749 4.88434 5.86185 4.92497L4.47068 5.46004C4.1288 5.59153 4.1288 6.07522 4.47068 6.20671L5.86185 6.74178C5.96749 6.78241 6.05097 6.86589 6.0916 6.97152L6.62666 8.36269C6.75815 8.70457 7.24185 8.70457 7.37334 8.36269L7.9084 6.97152C7.94903 6.86589 8.03251 6.78241 8.13815 6.74178L9.52932 6.20671C9.8712 6.07522 9.8712 5.59153 9.52932 5.46004L8.13815 4.92497ZM23.629 7.32296C23.5234 7.28233 23.4399 7.19886 23.3993 7.09324L22.54 4.85942C22.4085 4.51757 21.9248 4.51757 21.7933 4.85942L20.934 7.09324C20.8934 7.19886 20.8099 7.28233 20.7043 7.32296L18.4705 8.18227C18.1286 8.31377 18.1286 8.79742 18.4705 8.92893L20.7043 9.78824C20.8099 9.82887 20.8934 9.91233 20.934 10.018L21.7933 12.2518C21.9248 12.5936 22.4085 12.5936 22.54 12.2518L23.3993 10.018C23.4399 9.91233 23.5234 9.82887 23.629 9.78824L25.8628 8.92893C26.2047 8.79742 26.2047 8.31377 25.8628 8.18227L23.629 7.32296Z"
                    fill="url(#paint0_linear_698_102)"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_698_102"
                    x="-25.7852"
                    y="-22.9524"
                    width="81.9043"
                    height="82.619"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="15" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_698_102"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_698_102"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_698_102"
                    x1="26.8333"
                    y1="2.33337"
                    x2="3.50005"
                    y2="25.6667"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.19053" stop-color="#C59F81" />
                    <stop offset="0.790369" stop-color="#A87FBE" />
                  </linearGradient>
                </defs>
              </svg>
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
          <div className="container">
            <div className="prevBox">
              <p>
                Upload your Document <br /> & transform it into{" "}
                <span>WOW.</span>
              </p>
            </div>
          </div>
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
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_698_73)">
                  <g filter="url(#filter0_d_698_73)">
                    <path
                      d="M19.6875 5.25H4.3125C4.00184 5.25 3.75 5.50184 3.75 5.8125V14.4375C3.75 14.7482 4.00184 15 4.3125 15H19.6875C19.9982 15 20.25 14.7482 20.25 14.4375V5.8125C20.25 5.50184 19.9982 5.25 19.6875 5.25Z"
                      fill="url(#paint0_linear_698_73)"
                    />
                  </g>
                  <g filter="url(#filter1_d_698_73)">
                    <path
                      d="M20.25 3H12.75V2.25C12.75 2.05109 12.671 1.86032 12.5303 1.71967C12.3897 1.57902 12.1989 1.5 12 1.5C11.8011 1.5 11.6103 1.57902 11.4697 1.71967C11.329 1.86032 11.25 2.05109 11.25 2.25V3H3.75C3.15345 3.00062 2.58152 3.23787 2.1597 3.6597C1.73787 4.08152 1.50062 4.65345 1.5 5.25V15C1.50062 15.5965 1.73787 16.1685 2.1597 16.5903C2.58152 17.0121 3.15345 17.2494 3.75 17.25H5.75578L4.52906 21.5438C4.49979 21.6391 4.48982 21.7393 4.49973 21.8385C4.50964 21.9377 4.53923 22.0339 4.58678 22.1216C4.63433 22.2092 4.69888 22.2865 4.77665 22.3489C4.85443 22.4113 4.94386 22.4576 5.03973 22.485C5.13559 22.5124 5.23596 22.5205 5.33497 22.5086C5.43398 22.4968 5.52963 22.4654 5.61634 22.4161C5.70305 22.3669 5.77907 22.3009 5.83995 22.2219C5.90084 22.1429 5.94537 22.0526 5.97094 21.9562L7.31578 17.25H11.25V19.5C11.25 19.6989 11.329 19.8897 11.4697 20.0303C11.6103 20.171 11.8011 20.25 12 20.25C12.1989 20.25 12.3897 20.171 12.5303 20.0303C12.671 19.8897 12.75 19.6989 12.75 19.5V17.25H16.6842L18.0291 21.9562C18.0546 22.0526 18.0992 22.1429 18.16 22.2219C18.2209 22.3009 18.297 22.3669 18.3837 22.4161C18.4704 22.4654 18.566 22.4968 18.665 22.5086C18.764 22.5205 18.8644 22.5124 18.9603 22.485C19.0561 22.4576 19.1456 22.4113 19.2233 22.3489C19.3011 22.2865 19.3657 22.2092 19.4132 22.1216C19.4608 22.0339 19.4904 21.9377 19.5003 21.8385C19.5102 21.7393 19.5002 21.6391 19.4709 21.5438L18.2442 17.25H20.25C20.8465 17.2494 21.4185 17.0121 21.8403 16.5903C22.2621 16.1685 22.4994 15.5965 22.5 15V5.25C22.4994 4.65345 22.2621 4.08152 21.8403 3.6597C21.4185 3.23787 20.8465 3.00062 20.25 3ZM21 15C21 15.1989 20.921 15.3897 20.7803 15.5303C20.6397 15.671 20.4489 15.75 20.25 15.75H3.75C3.55109 15.75 3.36032 15.671 3.21967 15.5303C3.07902 15.3897 3 15.1989 3 15V5.25C3 5.05109 3.07902 4.86032 3.21967 4.71967C3.36032 4.57902 3.55109 4.5 3.75 4.5H20.25C20.4489 4.5 20.6397 4.57902 20.7803 4.71967C20.921 4.86032 21 5.05109 21 5.25V15Z"
                      fill="url(#paint1_linear_698_73)"
                    />
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_d_698_73"
                    x="-26.25"
                    y="-20.75"
                    width="76.5"
                    height="69.75"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="15" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_698_73"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_698_73"
                      result="shape"
                    />
                  </filter>
                  <filter
                    id="filter1_d_698_73"
                    x="-28.5"
                    y="-24.5"
                    width="81"
                    height="81.0139"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="15" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_698_73"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_698_73"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_698_73"
                    x1="20.25"
                    y1="5.25"
                    x2="11.7094"
                    y2="19.7033"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.19053" stop-color="#8191C5" />
                    <stop offset="0.804871" stop-color="#7FB8BE" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_698_73"
                    x1="22.5"
                    y1="1.5"
                    x2="1.48607"
                    y2="22.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.19053" stop-color="#8191C5" />
                    <stop offset="0.804871" stop-color="#7FB8BE" />
                  </linearGradient>
                  <clipPath id="clip0_698_73">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
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
                      tempSelectedStyleButton === styleButton.id
                        ? "btnConE active"
                        : "btnConE"
                    }
                  >
                    <button
                      style={{ backgroundColor: styleButton.bg }}
                      onClick={() => handleTempStyleButtonClick(styleButton.id)}
                    >
                      <img src={styleButton.image} className="prev" />
                    </button>
                  </div>
                  {tempSelectedStyleButton === styleButton.id ? (
                    <img src="/blackhaken.svg" className="ok active" />
                  ) : (
                    <img src="/blackhaken.svg" className="ok " />
                  )}
                  <p className="buttonConText">{styleButton.text}</p>
                </div>
              ))}
            </div>
          </>
        ) : showLanguageModal && !showFormatModal ? (
          <>
            <button
              className="doneButton"
              onClick={() => {
                toggleModal();
                handleLanguageDoneClick();
              }}
            >
              Done
            </button>
            <p className="paragraphHeading">Language</p>
            <p className="styleDes">Choose a language for your presentation.</p>
            <div className="styleSelectorButtonContainer">
              {languageButtons.map((languageButton) => (
                <div className="styleButtonContainer" key={languageButton.id}>
                  <div
                    className={
                      tempSelectedLanguageButton === languageButton.id
                        ? "btnConE active"
                        : "btnConE"
                    }
                  >
                    <button
                      style={{ backgroundColor: languageButton.bg }}
                      onClick={() =>
                        handleTempLanguageButtonClick(languageButton.id)
                      }
                    >
                      <img src={languageButton.image} className="prev" />
                    </button>
                  </div>
                  {tempSelectedLanguageButton === languageButton.id ? (
                    <img src="/blackhaken.svg" className="ok active" />
                  ) : (
                    <img src="/blackhaken.svg" className="ok " />
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
                      tempSelectedFormatButton === button.id
                        ? "btnConE active"
                        : "btnConE"
                    }
                  >
                    <button
                      style={{ backgroundColor: button.bg }}
                      onClick={() => handleTempFormatButtonClick(button.id)}
                    >
                      <img src={button.image} className="prev" />
                    </button>
                  </div>
                  {tempSelectedFormatButton === button.id ? (
                    <img src="/blackhaken.svg" className="ok active" />
                  ) : (
                    <img src="/blackhaken.svg" className="ok " />
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
        {loaded ? (
          <div className="container">
            <img
              src={selectedImage.imagePath}
              alt="Preview"
              className={selectedImage.className}
            />
          </div>
        ) : (
          <h1>Loading...</h1>
        )}

        <p className="firstParagraph">
          Your{" "}
          {selectedButton == 1
            ? "Summary"
            : selectedButton == 2
            ? "Presentation"
            : selectedButton == 3
            ? "Flyer "
            : selectedButton == 4
            ? "Worksheet"
            : "Format"}{" "}
          <br />
          <span>is ready</span>
        </p>
        <p className="downloadText">Download now</p>
        <a
          href="/SpreadMarketSaudiArabia.pdf"
          download="SpreadMarketSaudiArabia.pdf"
        >
          <button className="downloadButton">
            <img src="/cloudblack.svg" alt="Download" />
            <p className="downloadText">Download</p>
          </button>
        </a>
        <p className="downloadDes">
          Your pdf document has been transformed into a brand new{" "}
          {selectedButton == 1
            ? "summary."
            : selectedButton == 2
            ? "presentation."
            : selectedButton == 3
            ? "flyer."
            : selectedButton == 4
            ? "worksheet."
            : "format."}
        </p>
      </div>
    </>
  );
}

export default Startpage;
