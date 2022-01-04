import React from 'react';


const UserForm = (props) => {
    const { submitHandler, user, setUser, errors, buttonText } = props;

    const onChangeHandler = (e) => {
        const newStateObject = { ...user };
        newStateObject[e.target.name] = e.target.value;
        setUser(newStateObject);
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="logregform">
                    <label className="form-labels">Username:</label>
                    <input className="login-input" type="text" name="username" value={user.username} onChange={onChangeHandler} />
                    {errors.username ? (
                        <span className="error-text">
                            {errors.username.message}
                        </span>
                    ) : null}
                </div>
                <div className="logregform">
                    <label className="form-labels">Email:</label>
                    <input className="login-input" type="text" name="email" value={user.email} onChange={onChangeHandler} />
                    {errors.email ? (
                        <span className="error-text">
                            {errors.email.message}
                        </span>
                    ) : null}
                </div>
                <div className="logregform">
                    <label className="form-labels">Password:</label>
                    <input className="login-input" type="password" name="password" value={user.password} onChange={onChangeHandler} />
                    {errors.password ? (
                        <span className="error-text">
                            {errors.password.message}
                        </span>
                    ) : null}
                </div>
                <div className="logregform">
                    <label className="form-labels">Confirm Password:</label>
                    <input className="login-input" type="password" name="confirmPassword" value={user.confirmPassword} onChange={onChangeHandler} />
                    {errors.confirmPassword ? (
                        <span className="error-text">
                            {errors.confirmPassword.message}
                        </span>
                    ) : null}
                </div>
                <div className="logregform">
                    <label className="form-labels">Profile Picture (Img URL):</label>
                    <input className="login-input" type="text" name="picture" value={user.picture} onChange={onChangeHandler} />
                    {errors.picture ? (
                        <span className="error-text">
                            {errors.picture.message}
                        </span>
                    ) : null}
                </div>
                <div className="logregform">
                    <label className="form-labels">Trading Experience (yrs):</label>
                    <input className="login-input" type="number" name="experience" value={user.experience} onChange={onChangeHandler} />
                    {errors.experience ? (
                        <span className="error-text">
                            {errors.experience.message}
                        </span>
                    ) : null}
                </div>
                <div className="logregform">
                    <label className="form-labels">Favorite Quote:</label>
                    <textarea className="login-input" rows="4" type="text" name="quote" value={user.quote} onChange={onChangeHandler} />
                    {errors.quote ? (
                        <span className="error-text">
                            {errors.quote.message}
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

export default UserForm;


