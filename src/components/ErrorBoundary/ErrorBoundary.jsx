import React, { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Called when an error occurs in a child component
  static getDerivedStateFromError() {
    // Update state to display the fallback UI
    return { hasError: true };
  }

  // Called after an error is caught, allows for logging error details
  componentDidCatch(error, info) {
    console.error("An error occurred:", error);
    console.error("Error details:", info);
  }

  render() {
    if (this.state.hasError) {
      // Display a fallback UI when an error occurs
      return (
        <h1 style={{ margin: "20px" }}>
          Something went wrong. Please try again later.
        </h1>
      );
    }

    // Render child components normally if no error
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
