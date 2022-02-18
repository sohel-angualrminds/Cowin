import React, { useState } from 'react'

function FindByPin(props) {
    const { pinChange } = props;
    const [pincode, setPinCode] = useState('');
    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <input type="text" placeholder="Enter your PIN" value={pincode}
                            onChange={(e) => {
                                setPinCode(e.target.value);
                            }}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="col-auto">
                    <button className="btn btn-info" onClick={()=> pinChange(pincode)}>Search</button>
                </div>
            </div>
        </>
    )
}

export default FindByPin