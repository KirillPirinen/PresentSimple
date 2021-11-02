const ProgressBar = (props) => {
  const { bgcolor, completed, width } = props;

  function getProcent(num, max) {
     return num * 100 / max
  }

  const containerStyles = {
    height: 30,
    width: `${20}%`,
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50
  }

  const fillerStyles = {
    height: '100%',
    width: `${getProcent(completed, width)}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  const labelStyles = {
    padding: 15,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
