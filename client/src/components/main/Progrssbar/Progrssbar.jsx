const ProgressBar = (props) => {
  const { completed, width } = props;

  function getProcent(num, max) {
     return num * 100 / max
  }

  const containerStyles = {
    width: `${100}%`,
    backgroundColor: "#e0e0de",
    borderRadius: 50,
  }

  const fillerStyles = {
    height: '100%',
    width: `${getProcent(completed, width)}%`,
    backgroundColor: '#6D3A06',
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  const labelStyles = {
    padding: 27,
    color: '#6D3A06',
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
