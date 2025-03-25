// WIP

function SignUp() {
  return (
    <form className="my-form">
      <div className="form-group">
        <label>Enter your username</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Enter your password</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea name="message"></textarea>
      </div>
      <input className="button" type="submit" name="submit" id="" />
    </form>
  );
}

export default SignUp;
