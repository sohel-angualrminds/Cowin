import React, { memo, useState } from 'react'


function FIndByDist(props) {
    const { state,changeStateId,district,changeDistrictId } = props;    

  const [dist, setDist] = useState(district);
  
  return (
      <div>
          <div className="row" id="find_by_dist">
                <div className="col">
                    <div className="form-group">
                      <select onChange={(e)=>changeStateId(e.target.value)}className="form-control">
                            <option value="-1">Select State</option>
                             {state ? state.map(({ state_id, state_name }) => <option key={state_id} value={state_id}>{state_name}</option>):'' }
                      </select>
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
            <select className="form-control" onChange={(e) => {setDist(e.target.value)}}>
                            <option value="-1">Select District</option>
                          {district && district.map(({ district_id, district_name }) => <option key={district_id} value={district_id}>{district_name}</option>)}
                        </select>
                    </div>
                </div>
                <div className="col-auto">
          <button className="btn btn-info" onClick={()=>changeDistrictId(dist) }>Search</button>
                </div>
            </div>
    </div>
  )
}

export default memo(FIndByDist);