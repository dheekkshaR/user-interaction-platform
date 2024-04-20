import "./index.css";
import escapeHTML from "../../../../securityFunctions";

const Input = ({ title, hint, id, mandatory = true, val, setState, err }) => {
    return (
        <>
            <div className="input_title">
                {title}
                {mandatory ? "*" : ""}
            </div>
            {hint && <div className="input_hint">{hint}</div>}
            <input
                id={id}
                className="input_input"
                type="text"
                value={val}
                onInput={(e) => {
                //    const sanitizedValue = escapeHTML(e.target.value.trim());
                //    console.log(sanitizedValue);
                    setState(escapeHTML(e.target.value.trim()));
                }}
            />
            {err && <div className="input_error">{err}</div>}
        </>
    );
};

export default Input;
