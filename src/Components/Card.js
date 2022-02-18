import React, { useEffect, useState } from 'react'
import { getFiveDateArray } from './Other';
import { getVaccinationCenter } from '../Service/Service'

const Card = (props) => {
    const { district } = props;

    // const [date, setDate] = useState(() => getFiveDateArray()[0].date);
    const [dateArray, setDateArray] = useState(() => getFiveDateArray(0));


    const [data, setData] = useState('')

    useEffect(() => {
        async function fun() {
            const res1 = await getVaccinationCenter(district, dateArray[0].date);
            const res2 = await getVaccinationCenter(district, dateArray[1].date);
            const res3 = await getVaccinationCenter(district, dateArray[2].date);

            // console.log(res1);
            let arr = [];

            function combined(item1) {
                var obj = {
                    [item1.center_id]: {
                        item1: item1
                    }
                }

                res2.forEach(item2 => {
                    if (item2.center_id === item1.center_id) {
                        obj[item1.center_id] = {
                            ...obj[item1.center_id],
                            item2: item2
                        }
                    }
                })

                res3.forEach(item3 => {
                    if (item3.center_id === item1.center_id) {
                        obj[item1.center_id] = {
                            ...obj[item1.center_id],
                            item3: item3
                        }
                    }
                })

               arr.push(obj)
            }
            
            res1.forEach(combined)
            var temp = arr.map((item1) => {
                return Object.entries(item1)[0][1];
            })

            setData(temp);
        }
        fun();
    }, [dateArray]);

    // console.log(data);
    return (
        <div className="card" key={district}>
            <div className="card-header">
                <div className="row">
                    <div className="col-3 text-end pt-2">
                        <span className="text-decoration-none text-secondary" onClick={() => { 
                            setDateArray(getFiveDateArray(-3))
                        } }>
                            <h2>&#x3008;</h2>
                        </span>
                    </div>
                    {dateArray && dateArray.map(({ _id, day, fdate }) =>
                        <div className="col" key={_id}>
                            <div className="card my-2">
                                <div className="card-body py-1 my-1">
                                    <strong>
                                        <small>{day}, {fdate}</small>
                                    </strong>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="col-auto pt-2">
                        <span className="text-decoration-none text-secondary"
                        onClick={() => { 
                            setDateArray(getFiveDateArray(+3))
                        } }
                        >
                            <h2>&#12297;</h2>
                        </span>
                    </div>
                </div>
            </div>
            <div className="card-body">
                {data && data.map(({ item1,item2,item3 }, index) =>
                    <div className="row py-3 border-bottom" key={index}>

                        <div className="col-3" key={index}>
                            <div className="text-primary">{item1.name}</div>
                            <div className="text-muted">
                                <small>({item1.block_name}){item1.address}</small>
                            </div>
                            <div>
                                <span className="me-1">{item1.vaccine}</span>
                                <span className={`badge bg-${item1.fee == 0 ? 'success' : 'warning'}`}>{item1.fee_type}</span>
                            </div>
                            <small className="d-block">
                                <span className="text-primary me-3">Age: {item1.min_age_limit} & {item1.max_age_limit}</span>

                                <span>Dose:{item1.available_capacity_dose1 > 0 ? (item1.available_capacity_dose2 > 0 ? 'Precaution' : `#1`) : `#2`}</span>
                            </small>
                        </div>

                        {item1 && <div className="col">
                            <div className="card h-100">
                                <div className="card-body d-table">
                                    <div className="d-table-cell h-100 align-middle text-center">
                                        <strong className={`text-${item1.available_capacity != 0 ? (item1.available_capacity <= 10 ? 'warning' : 'success') : 'danger'}`}>{item1.available_capacity} Slots</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }


                        {item2 ? <div className="col">
                            <div className="card h-100">
                                <div className="card-body d-table">
                                    <div className="d-table-cell h-100 align-middle text-center">
                                        <strong className={`text-${item2.available_capacity != 0 ? (item2.available_capacity <= 10 ? 'warning' : 'success') : 'danger'}`}>{item2.available_capacity} Slots</strong>
                                    </div>
                                </div>
                            </div>
                        </div>: <div className="col">
                            <div className="card h-100">
                                <div className="card-body d-table">
                                    <div className="d-table-cell h-100 align-middle text-center">
                                        <strong className="text-muted">N/A</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }


                        {item3 ?<div className="col">
                            <div className="card h-100">
                                <div className="card-body d-table">
                                    <div className="d-table-cell h-100 align-middle text-center">
                                        <strong className={`text-${item3.available_capacity != 0 ? (item3.available_capacity <= 10 ? 'warning' : 'success') : 'danger'}`}>{item3.available_capacity} Slots</strong>
                                    </div>
                                </div>
                            </div>
                        </div> :<div className="col">
                            <div className="card h-100">
                                <div className="card-body d-table">
                                    <div className="d-table-cell h-100 align-middle text-center">
                                        <strong className="text-muted">N/A</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                ) || <>Loading...</>}
            </div>
        </div>
    )
}
export default Card;