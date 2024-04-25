import React, { useState, useEffect } from "react";
import {
  Button,
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Container,
  Card,
  CardHeader,
  Row,
  CardBody,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

function Questions() {
  const [projectName, setProjectName] = useState("");
  const [featureCount, setFeatureCount] = useState(3);
  const [features, setFeatures] = useState(new Array(3).fill(""));
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Load data from localStorage when the component mounts
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setProjectName(parsedData.projectName);
      setFeatureCount(parsedData.featureCount);
      setFeatures(parsedData.features);
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage whenever it changes
    const formData = { projectName, featureCount, features };
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [projectName, featureCount, features]);

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleFeatureCountChange = (e) => {
    // Parse the input value to an integer, default to 0 if parsing fails
    const value = e.target.value;
    const newFeatureCount = value !== "" ? Math.max(parseInt(value, 10), 0) : 0;
    setFeatureCount(newFeatureCount);

    // Adjust the features array to the new count
    setFeatures((currentFeatures) => {
      if (currentFeatures.length < newFeatureCount) {
        // If we need more features, add empty strings
        return [
          ...currentFeatures,
          ...new Array(newFeatureCount - currentFeatures.length).fill(""),
        ];
      } else if (currentFeatures.length > newFeatureCount) {
        // If we have too many features, slice the array
        return currentFeatures.slice(0, newFeatureCount);
      }
      return currentFeatures;
    });
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!projectName.trim()) {
      newErrors.projectName = "Project name is required.";
      isValid = false;
    }

    if (featureCount <= 0) {
      newErrors.featureCount = "Feature count must be greater than zero.";
      isValid = false;
    }

    features.forEach((feature, index) => {
      if (!feature.trim()) {
        newErrors[`feature${index}`] = `Feature ${index + 1} is required.`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Reset errors
    setErrors({});

    if (validateForm()) {
      // If the form is valid, process the form submission
      const projectData = {
        projectName,
        features,
      };
      console.log(projectData);
      navigate("/questionnaire");
      // Construct the URL with features as parameters
    }
  };

  /*
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the submission logic here
    const projectData = {
      projectName,
      features
    };
    console.log(projectData);
  };
*/
  return (
    <Container className="my-5">
      <Row>
        <Col className="order-xl-2 mb-5 mb-xl-0" xl="2"></Col>
        <Col className="order-xl-1 mb-5 mb-xl-0" xl="10">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Your Role</h3>
                </Col>
              </Row>
            </CardHeader>

            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup row>
                  <Label for="role" sm={2}>
                    Select your role
                  </Label>
                  <Col sm={4}>
                    <Input type="select" name="role" id="role">
                      <option>Product Manager</option>
                      <option>Project Manager</option>
                      <option>Developer</option>
                      <option>Tester</option>
                    </Input>
                  </Col>
                </FormGroup>

                <div>
                  <h3 className="mb-4 mt-5">Project</h3>
                </div>

                <FormGroup row>
                  <Label for="project-name" sm={2}>
                    Project Name:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="projectName"
                      id="project-name"
                      value={projectName}
                      onChange={handleProjectNameChange}
                      required
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="feature-count" sm={2}>
                    Number of Features:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="number"
                      name="featureCount"
                      id="feature-count"
                      value={featureCount}
                      onChange={handleFeatureCountChange}
                      min="0"
                      required
                    />
                  </Col>
                </FormGroup>

                {new Array(featureCount).fill(null).map((_, index) => (
                  <FormGroup row key={`feature-${index}`}>
                    <Label for={`feature-${index}`} sm={2}>
                      Feature {index + 1}:
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name={`feature-${index}`}
                        id={`feature-${index}`}
                        value={features[index] || ""}
                        onChange={(e) =>
                          handleFeatureChange(index, e.target.value)
                        }
                      />
                    </Col>
                  </FormGroup>
                ))}

                <FormGroup row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button color="primary">Next</Button>
                    {Object.values(errors).map((error, index) => (
                      <Alert color="danger" key={index}>
                        {error}
                      </Alert>
                    ))}
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Questions;
