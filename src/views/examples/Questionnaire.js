import React, { useState, useEffect } from "react";
import {
  Container,
  Collapse,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
} from "reactstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const QuestionsForm = () => {
  const questions = [
    {
      question: "How does the software feature minimize energy consumption?",
      subQuestions: [
        "Implements energy-saving modes during inactivity.",
        "Optimized algorithms for reduced CPU intensity.",
        "Uses cloud services with a commitment to renewable energy.",
        "Reduces the need for physical hardware through virtualization.",
        "Includes settings for users to control energy use.",
        "Efficient memory management to minimize resource usage.",
        "Does not require high-performance hardware to operate.",
        "Energy consumption metrics are provided to users.",
        "Adapts resource use according to the device’s power source.",
        "Regular updates include optimization for energy efficiency.",
      ],
    },
    {
      question:
        "In what ways does the software feature support environmental sustainability?",
      subQuestions: [
        "Encourages paperless operations and transactions.",
        "Integrates with other eco-friendly software systems.",
        "Reduces the need for travel through remote capabilities.",
        "Tracks environmental metrics like carbon footprint.",
        "Supports user settings for eco-friendly operations.",
        "Educates users about sustainability through in-app content.",
        "Uses artificial intelligence to optimize resource allocation.",
        "Monitors and suggests optimization for resource use.",
        "Aligns with international standards for environmental sustainability.",
        "Features are developed with a focus on minimal environmental impact.",
      ],
    },
  ];
  const [name, setName] = useState([]);

  useEffect(() => {
    // Fetching data from localStorage
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      // If data exists, parse it and set the state
      const parsedData = JSON.parse(storedData);
      console.log(parsedData);
      setName(storedData);
      console.log(name);
    }
  }, []);

  // Assume that feature data is coming from somewhere
  const featuresData = ["Feature 1", "Feature 2", "Feature 3", "Feature 4"];

  // Initialize the features state with empty values for each sub-question
  const initialFeatures = featuresData.map(() => {
    return questions.map(() => {
      return {
        subQuestionValues: Array(questions.length).fill(""), // Initialize sub-questions to empty strings
      };
    });
  });

  const [features, setFeatures] = useState(initialFeatures);

  // Initialize remaining points state
  const initialRemainingPoints = featuresData.map(() =>
    questions.map(() => 10)
  );
  const [remainingPoints, setRemainingPoints] = useState(
    initialRemainingPoints
  );

  // Initialize state for collapse toggles for each question within each feature
  const initialIsOpen = questions.map(() => false);
  const [isOpen, setIsOpen] = useState(
    featuresData.map(() => [...initialIsOpen])
  );

  const toggleCollapse = (featureIndex, questionIndex) => {
    const updatedIsOpen = [...isOpen];
    updatedIsOpen[featureIndex][questionIndex] =
      !updatedIsOpen[featureIndex][questionIndex];
    setIsOpen(updatedIsOpen);
  };

  const handleSubQuestionChange = (
    featureIndex,
    questionIndex,
    subIndex,
    event
  ) => {
    const newValue = parseInt(event.target.value, 10) || 0;

    // Get the current sub-question value
    const oldValue =
      parseInt(
        features[featureIndex][questionIndex].subQuestionValues[subIndex],
        10
      ) || 0;

    // Calculate the new remaining points
    const newRemainingPoints =
      remainingPoints[featureIndex][questionIndex] + oldValue - newValue;

    // Update remaining points only if within valid range (0 to 10)
    if (newRemainingPoints >= 0 && newRemainingPoints <= 10) {
      // Update the remaining points state
      const updatedRemainingPoints = [...remainingPoints];
      updatedRemainingPoints[featureIndex][questionIndex] = newRemainingPoints;
      setRemainingPoints(updatedRemainingPoints);

      // Update the sub-question values state
      const updatedFeatures = [...features];
      updatedFeatures[featureIndex][questionIndex].subQuestionValues[subIndex] =
        newValue;
      setFeatures(updatedFeatures);
    }
  };

  return (
    <Container>
      <Card className="p-3">
        <h2 className="mt-3 mb-4">Feature Questionnaire</h2>
        <Form>
          {featuresData.map((feature, featureIndex) => (
            <div key={featureIndex}>
              <FormGroup>
                <Label for={`feature-${featureIndex}`}>{feature}</Label>
              </FormGroup>
              {questions.map((question, questionIndex) => (
                <div key={questionIndex}>
                  <Card key={questionIndex} className="mb-3">
                    <div className="d-flex justify-content-between">
                      <CardBody>
                        <FormGroup>
                          <Label>{question.question}</Label>
                          <FormGroup>
                            <Label for="remainingPoints">
                              Remaining Points:{" "}
                              {remainingPoints[featureIndex][questionIndex]}
                            </Label>
                            <Input
                              type="text"
                              name="remainingPoints"
                              id="remainingPoints"
                              value={
                                remainingPoints[featureIndex][questionIndex]
                              }
                              readOnly
                            />
                          </FormGroup>
                          <Collapse
                            isOpen={isOpen[featureIndex][questionIndex]}
                          >
                            <ul>
                              {question.subQuestions.map(
                                (subQuestion, subIndex) => (
                                  <li key={subIndex}>
                                    <Label
                                      check
                                      className="d-flex align-items-center justify-content-between"
                                    >
                                      {subQuestion}
                                      <Input
                                        type="number"
                                        className="ml-2 input-sm"
                                        style={{ width: "150px" }}
                                        min={0}
                                        max={
                                          remainingPoints[featureIndex][
                                            questionIndex
                                          ]
                                        }
                                        value={
                                          features[featureIndex][questionIndex]
                                            .subQuestionValues[subIndex]
                                        }
                                        onChange={(event) =>
                                          handleSubQuestionChange(
                                            featureIndex,
                                            questionIndex,
                                            subIndex,
                                            event
                                          )
                                        }
                                        disabled={
                                          remainingPoints[featureIndex][
                                            questionIndex
                                          ] === 0
                                        }
                                      />
                                    </Label>
                                  </li>
                                )
                              )}
                            </ul>
                          </Collapse>
                        </FormGroup>
                      </CardBody>
                      {!isOpen[featureIndex][questionIndex] && (
                        <Button
                          color="link"
                          onClick={() =>
                            toggleCollapse(featureIndex, questionIndex)
                          }
                        >
                          <FaChevronDown />
                        </Button>
                      )}
                      {isOpen[featureIndex][questionIndex] && (
                        <Button
                          color="link"
                          onClick={() =>
                            toggleCollapse(featureIndex, questionIndex)
                          }
                        >
                          <FaChevronUp />
                        </Button>
                      )}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          ))}
          <Button color="primary" className="mt-3">
            Finish
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default QuestionsForm;
