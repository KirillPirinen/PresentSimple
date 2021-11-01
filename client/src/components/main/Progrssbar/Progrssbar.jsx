const ProgressBar = (props) => {
  const { bgcolor, completed, width } = props;
  console.log('completed', completed)
  console.log('width', width)

  function getProcent(num, max) {
     return num * 100 / max
  }

  const containerStyles = {
    height: 20,
    width: `${50}%`,
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
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;