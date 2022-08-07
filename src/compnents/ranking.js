const Ranking=(props)=>{
  const All = props.all
  All.sort(function(a,b){return a.Score - b.Score})
  All.reverse()
  const Row=(props)=>{
    if (props.cols.Username===props.green.Username&&
      props.cols.Score===props.green.Score){
        return(
          <tr className="table-success">
          <th scope="row">{props.col1+1}</th>
          <td>{props.cols.Username}</td>
          <td>{props.cols.Score}</td>
          </tr>
        )
      }
    else
    {return (
      <tr>
        <th scope="row">{props.col1+1}</th>
        <td>{props.cols.Username}</td>
        <td>{props.cols.Score}</td>
      </tr>
    )}
  }
    return(
        <div style={{width:"400px",height:"180px",overflow:"scroll"}}>
                <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {All.map((d,i)=>(<Row col1={i} cols={d} green={props.user}/>))
                  }
                </tbody>
              </table>
        </div>
    )
}

export default Ranking