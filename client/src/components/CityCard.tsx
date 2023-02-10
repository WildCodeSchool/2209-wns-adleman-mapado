import CSS from "csstype";

interface City {
  id: number;
  name: string;
  city_area: string;
  photo?: string;
  user: {}[];
}

export default function CityCard({ cityName, cityPhoto }: any) {
  const cardStyles: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "17rem",
    width: "15.6rem",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: "40px",
    borderTopRightRadius: "40px",
    borderBottomLeftRadius: "40px",
    border: "1px solid #EC5D5C",
    margin: "2rem",
    color: "#EC5D5C",
    fontFamily: 'Josefin Sans',
    fontWeight: 700,
    fontSize: '1.25rem'
  };

  const photoStyles: CSS.Properties = {
    height: "7.5rem",
    width: "15.6rem",
    borderTopLeftRadius: "40px",
    borderTopRightRadius: "40px",
    backgroundColor: '#EC5D5C',
  };

  const buttonStyles: CSS.Properties = {
    height: "2.5rem",
    width: "8rem",
    border: "1px solid #EC5D5C",
    borderRadius: "40px",
    marginBottom: "36px",
    fontWeight: "600",
    fontSize: "1rem",
  };
  return (
    <div style={cardStyles}>
      {cityPhoto ? (
        <img alt="city" src={cityPhoto} style={photoStyles} />
      ) : (
        <div style={photoStyles}></div>
      )}
      <p>{cityName}</p>
      <button style={buttonStyles}>
        <p>Voir la ville</p>
      </button>
    </div>
  );
}
