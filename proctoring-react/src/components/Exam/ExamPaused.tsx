const ExamPaused = ({ errors }: { errors: string[] }) => {
  return (
    <div
      style={{
        backgroundColor: "#ffcccb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2>Exam Paused!</h2>
      <ul>
        <li>
          Exam has been un-mounted from the dom to prevent user from messing
          around using developer tools.
        </li>
        <li>
          You can keep a warning count of the user and terminate the test if the
          user exceeds a minimum threshold of warnings.
        </li>
        {errors.map((err) => {
          return <li>{err}</li>;
        })}
      </ul>
    </div>
  );
};

export default ExamPaused;
