import React from 'react';


const StonkForm = (props) => {
    const { submitHandler, stonk, setStonk, errors, buttonText } = props;

    const onChangeHandler = (e) => {
        const newStateObject = { ...stonk };
        newStateObject[e.target.name] = e.target.value;
        setStonk(newStateObject);
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="logregform">
                    <label className="form-labels">Name:</label>
                    <input className="login-input" type="text" name="stonkName" value={stonk.stonkName} onChange={onChangeHandler} />
                    {errors.stonkName ? (
                        <span className="error-text">
                            {errors.stonkName.message}
                        </span>
                    ) : null}
                </div>
                <div className="logregform">
                    <label className="form-labels">Ticker Symbol:</label>
                    <input className="login-input" type="text" name="ticker" value={stonk.ticker} onChange={onChangeHandler} />
                    {errors.ticker ? (
                        <span className="error-text">
                            {errors.ticker.message}
                        </span>
                    ) : null}
                </div>
                <div className="logregform">
                    <label className="form-labels">Current Price ($):</label>
                    <input className="login-input" type="text" name="price" value={stonk.price} onChange={onChangeHandler} />
                    {errors.price ? (
                        <span className="error-text">
                            {errors.price.message}
                        </span>
                    ) : null}
                </div>
                <div className="logregform">
                    <label className="form-labels">Market Cap ($):</label>
                    <input className="login-input" type="text" name="mktcap" value={stonk.mktcap} onChange={onChangeHandler} />
                    {errors.mktcap ? (
                        <span className="error-text">
                            {errors.mktcap.message}
                        </span>
                    ) : null}
                </div>
                <div className="logregform">
                    <label className="form-labels">Logo (Img URL):</label>
                    <input className="login-input" type="text" name="logo" value={stonk.logo} onChange={onChangeHandler} />
                    {errors.logo ? (
                        <span className="error-text">
                            {errors.logo.message}
                        </span>
                    ) : null}
                </div>
                <div className="center-button">
                    <button class="hover-button" type="submit">{buttonText}</button>
                </div>
            </form>
        </div>
    )
}

export default StonkForm;


