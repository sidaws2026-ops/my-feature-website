const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
}));

document.getElementById('year').textContent = new Date().getFullYear();
const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0,10);
document.querySelectorAll('input[type="date"]').forEach(input => input.min = localDate);

const courseInfo = {
  "React JS Development": ["Create responsive, component-based web interfaces and understand the modern front-end workflow.", ["HTML, CSS & modern JavaScript", "Components, props, state & hooks", "Routing, forms and API integration", "Build and deploy a portfolio project"]],
  "Java Full Stack Development": ["Develop the foundations to build end-to-end web applications using Java and modern web technologies.", ["Core Java and object-oriented programming", "Spring Boot and REST APIs", "SQL, persistence and database design", "Front-end integration and capstone project"]],
  "Python Full Stack Development": ["Learn to create and connect full-stack web applications with Python.", ["Python fundamentals and OOP", "Django, routing and templates", "REST APIs and SQL databases", "Build and deploy a web application"]],
  "AWS Cloud Computing": ["Understand cloud computing and gain practical experience with core AWS services.", ["Cloud concepts and AWS global infrastructure", "IAM, EC2, S3 and VPC fundamentals", "Monitoring, security and cost basics", "Deploy a sample cloud workload"]],
  "DevOps Engineering": ["Explore the tools and practices used to automate software delivery and infrastructure workflows.", ["Linux, Git and scripting fundamentals", "CI/CD pipelines with Jenkins", "Docker and container fundamentals", "Cloud deployment and monitoring concepts"]],
  "Manual & Automation Testing": ["Learn how to test software systematically and understand the foundations of test automation.", ["Testing lifecycle and test case design", "Defect tracking and Agile workflows", "Automation concepts with Selenium", "API testing and practical test scenarios"]],
  "SQL & Database Management": ["Build confidence in querying, organising and working with relational data.", ["Relational database concepts", "SELECT, filtering, joins and subqueries", "Data modelling and normalisation", "Practical reporting exercises"]],
  "Data Science & Machine Learning": ["Explore the data workflow from analysis and visualisation to introductory predictive models.", ["Python, NumPy and Pandas", "Data cleaning and exploration", "Visualisation and statistics basics", "Introductory machine learning workflow"]],
  "Angular Development": ["Build structured single-page applications using Angular and TypeScript.", ["TypeScript and Angular fundamentals", "Components, services and dependency injection", "Routing, forms and RxJS basics", "API integration and final project"]],
  "UI/UX Design": ["Learn a user-centred design process and create clear, usable digital experiences.", ["User research and journey mapping", "Information architecture and wireframes", "Figma components and prototyping", "Usability testing and portfolio case study"]]
};
const dialog = document.getElementById('course-dialog');
document.querySelectorAll('[data-course]').forEach(button => button.addEventListener('click', () => {
  const name = button.dataset.course, info = courseInfo[name];
  document.getElementById('dialog-title').textContent = name;
  document.getElementById('dialog-description').textContent = info[0];
  const list = document.getElementById('dialog-topics'); list.innerHTML = '';
  info[1].forEach(topic => { const li = document.createElement('li'); li.textContent = topic; list.appendChild(li); });
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.querySelector('.dialog-cta').addEventListener('click', () => dialog.close());

document.querySelectorAll('.form-tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.form-tab').forEach(item => { item.classList.remove('active'); item.setAttribute('aria-selected','false'); });
  document.querySelectorAll('.lead-form').forEach(form => form.classList.remove('active-form'));
  tab.classList.add('active'); tab.setAttribute('aria-selected','true');
  document.getElementById(tab.dataset.tab).classList.add('active-form');
}));

function handleDemoSubmit(form, message) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    message.textContent = `Thanks, ${data.name}! Your request has been captured in this demo. Connect a backend or form service to receive enquiries.`;
    form.reset();
    const dateInput = form.querySelector('input[type="date"]');
    if (dateInput) dateInput.min = localDate;
  });
}
document.querySelectorAll('form').forEach(form => {
  const message = form.querySelector('.form-message');
  if (!message) return;
  handleDemoSubmit(form, message);
});
