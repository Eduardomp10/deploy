const validate = (form) => {
    let errors = {};
  
    if (!form.name || form.name.length < 6) errors.name = "Name must be at least 6 letters long.";
    if (!/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(form.image)) errors.image = "Must provide a correct image URL.";
    if (!form.summary || form.summary.length < 40) errors.summary = "Description must be at least 40 letters long. Tell us what's good about your dish!";
    if (!form.healthScore || isNaN(Number(form.healthScore)) || form.healthScore < 1 || form.healthScore > 100) errors.healthScore = "Must be a number between 1 and 100.";
    if (!form.diets || form.diets.length < 1) errors.diets = "Must select at least one of the provided diets.";
    if (!form.steps || form.steps.length < 1 || form.steps[0].trim() === "") errors.steps = "Must have at least one step.";
  
    return errors;
  };
  
  export default validate;