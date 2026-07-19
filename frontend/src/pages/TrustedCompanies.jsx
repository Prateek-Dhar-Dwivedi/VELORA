import "./TrustedCompanies.css";

function TrustedCompanies() {
  const companies = [
    "/logos/google.png",
    "/logos/microsoft.png",
    "/logos/amazon.png",
    "/logos/meta.png",
    "/logos/netflix.png",
    "/logos/adobe.png",
  ];

  return (
    <section className="trusted">
      <p>
        Trusted by candidates applying to
        the world's top companies
      </p>

      <div className="company-row">
        {companies.map((logo, index) => (
          <div key={index} className="company-logo">
            <img src={logo} alt="Company logo" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrustedCompanies;