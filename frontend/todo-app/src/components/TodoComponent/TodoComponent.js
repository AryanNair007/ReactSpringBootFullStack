import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Security/AuthContext";
import {
  createdTodoApi,
  retrieveTodoApi,
  updateTodoApi,
} from "../../api/todoApiService";
import { Field, Formik, Form, ErrorMessage } from "formik";
// import { Form } from "react-bootstrap";

function TodoComponent() {
  const { id } = useParams();
  const authContext = useAuth();
  const username = authContext.user.username;
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  useEffect(() => {
    const retrieveTodos = async () => {
      try {
        const response = await retrieveTodoApi(authContext.user.username, id);
        const result = response.data;
        setDescription(result.description);
        setTargetDate(result.targetDate);
      } catch (error) {
        console.log(error);
      }
    };

    if (id != -1) retrieveTodos();
  }, [authContext.user, id]);

  const onSubmit = async (values) => {
    const todo = {
      id,
      username: authContext.user.username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };
    if (id != -1) await updateTodoApi(username, id, todo);
    else await createdTodoApi(username, todo);
    navigate("/todos");
  };
  const validate = (values) => {
    let errors = {};
    if (values.description.length < 5)
      errors.description = "Enter atleast 5 character";
    if (values.targetDate == null || values.targetDate == "")
      errors.targetDate = "Enter a valid target date";

    return errors;
  };

  return (
    <div className="container">
      <h1>Enter Todo Details</h1>
      <div>{description}</div>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Target Date</label>
                <Field type="date" className="form-control" name="targetDate" />
              </fieldset>
              <div>
                <button className="btn btn-success m-5" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default TodoComponent;
