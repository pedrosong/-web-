function AboutPage(props) {
  //console.log(props);
  //const {history} = props;
  console.log(props.match);
  return (
    <div>
      <h1>关于我们</h1>
      {/* <button onClick={()=>{
          history.go(1)
      }}>返回</button> */}
    </div>
  );
}

export default AboutPage;
