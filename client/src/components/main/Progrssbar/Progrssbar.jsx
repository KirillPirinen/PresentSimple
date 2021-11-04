const ProgressBar = (props) => {
  const { completed, width } = props;

  function getProcent(num, max) {
     return num * 100 / max
  }

  const containerStyles = {
    width: `${100}%`,
    backgroundColor: "#e0e0de",
    borderRadius: 40,
  }

  const fillerStyles = {
    height: '50%',
    width: `${getProcent(completed, width)}%`,
    backgroundColor: '#9ACD32',
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  const labellStyles = {
    padding: 35,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labellStyles}>{`${completed}`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
