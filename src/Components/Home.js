/* eslint-disable eqeqeq */
import React, { useCallback, useEffect, useState } from "react";
import { getData, getVaccinationCenterByPinCode } from "../Service/Service";
import FIndByDist from "./FIndByDist";
import FindByPin from "./FindByPin";
import Card from "./Card"
import Card2 from "./Card2";
import { getFiveDateArray } from "./Other";

const Home = () => {
  const [findBy, setFindBy] = useState(true);

  const [state_ID, setState_ID] = useState(null);
  const [district_ID, setDistrict_ID] = useState(null);


  const [data, setData] = useState(null);
  const [districtData, setDistrictData] = useState(null);

  const [card, setCard] = useState('');
  const [card2, setCard2] = useState('');
  const [pinCode,setPinCode]=useState('');

  //for state_id change
  const changeStateId = useCallback((id) => {
    setState_ID(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //for district ID
  const changeDistrictId = useCallback((id) => {
    setDistrict_ID(id);
    setCard(null);
  }, [])
  //for pin code
  const pinChange = (code) => {
    // console.log(code);
    setPinCode(code);
  }

  useEffect(() => {
    if (district_ID != null) {
      setCard(<Card key={district_ID} district={district_ID} />)
    }
  }, [district_ID])


  useEffect(() => {
    if (state_ID != -1 && state_ID !== null) {
      async function get() {
        const data = await getData(`${state_ID}.json`);
        setDistrictData(data.districts)
      }
      get();
    }
  }, [state_ID])

  useEffect(() => {
    if (pinCode!='') {
      
      setCard2(<Card2 key={pinCode} district={pinCode} />)
    }
   },[pinCode])


  useEffect(() => {
    async function get() {
      const data = await getData('states.json');
      // console.log(data.states);
      setData(data.states);
    }
    get();
  }, [])

  return (
    <div className="container">
      <div className="container my-5">
        <h3 className="text-center mb-5">Search Your Nearest Vaccination Center</h3>
        <div className="w-50 mx-auto">
          <div className="mt-4 mb-5">

            <ul className="nav nav-pills justify-content-center">

              <li className="nav-item">
                { /*Find By Dist */}
                <button className={`nav-link ${findBy && 'active'}`}
                  onClick={() => { setFindBy(true) }}
                >
                  Find by District</button>
              </li>

              <li className="nav-item">
                { /*Find By PIN */}
                <button className={`nav-link ${!findBy && 'active'}`}
                  onClick={() => { setFindBy(false) }}
                >
                  Find by PIN
                </button>
              </li>

            </ul>

          </div>
        </div>
        {findBy ? < FIndByDist state={data} changeStateId={changeStateId} district={districtData} changeDistrictId={changeDistrictId}/>
          : <FindByPin pinChange={pinChange} />}



        <div className="row">
          <div className="col-12 mt-5">
            <h6>Slot Search Results (81 Center(s) Found)</h6>
          </div>
        </div>

        {findBy? card && card : card2 && card2}

      </div>
    </div>//End of the Container
  );
};

export default Home;
