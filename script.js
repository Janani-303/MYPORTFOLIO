// ============ MOBILE NAV ============
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// ============ ACTIVE NAV LINK ON SCROLL ============
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector('.nav-link[href="#' + id + '"]');
    if (!link) return;
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
sections.forEach(s => navObserver.observe(s));

// ============ DEVOPS WORKFLOW INFO ============
const wfNodes = document.querySelectorAll('.wf-node');
const wfInfo = document.getElementById('wfInfo');

wfNodes.forEach(node => {
  node.addEventListener('click', () => {
    wfNodes.forEach(n => n.classList.remove('active'));
    node.classList.add('active');
    wfInfo.textContent = node.dataset.info;
  });
});

// ============ PROJECT MODALS ============
const projectData = {
  proj1: {
    title: 'AWS Cloud Storage Automation using EC2, EFS & S3',
    flow: 'EC2 &rarr; EFS &rarr; Linux Shell Script + AWS CLI &rarr; S3',
    objective: 'Automate file synchronization between persistent shared storage and long-term object storage using core AWS compute and storage services.',
    tech: ['AWS EC2', 'AWS EFS', 'AWS S3', 'Linux', 'Bash / Shell Scripting', 'AWS CLI'],
    steps: [
      'Launched and configured an EC2 instance.',
      'Mounted Amazon EFS as persistent shared storage.',
      'Created and configured an S3 bucket.',
      'Automated file synchronization between EFS and S3.',
      'Used Linux shell scripting and AWS CLI to drive the automation.',
      'Practiced AWS storage management and Linux automation.'
    ],
    learning: 'Hands-on exposure to how EC2, EFS and S3 fit together, and how shell scripting + the AWS CLI can automate routine storage operations.',
    github: null
  },
  proj2: {
    title: 'Highly Available Web Application using AWS',
    flow: 'Internet &rarr; ALB &rarr; Auto Scaling Group &rarr; EC2 Instances &rarr; Application &nbsp;|&nbsp; CloudWatch &rarr; SNS &rarr; Email',
    objective: 'Design and deploy a web application architecture that stays available and scales automatically under changing load, with monitoring and alerting built in.',
    tech: ['Amazon EC2', 'Auto Scaling Group', 'Application Load Balancer', 'CloudWatch', 'SNS'],
    steps: [
      'Deployed application instances using EC2.',
      'Configured an Auto Scaling Group.',
      'Used an Application Load Balancer to distribute traffic.',
      'Configured Auto Scaling policies for workload changes.',
      'Created CloudWatch monitoring and alarms.',
      'Integrated CloudWatch with SNS for email notifications.',
      'Practiced availability, scalability and monitoring concepts.'
    ],
    learning: 'Practical exposure to load balancing, auto scaling policies, and connecting infrastructure metrics to real alerting.',
    github: null
  },
  proj3: {
    title: 'CI/CD Pipeline for Java Web Application Deployment using Jenkins',
    flow: 'GitHub &rarr; Jenkins &rarr; Maven Build &rarr; WAR File &rarr; Apache Tomcat &rarr; Running Application',
    objective: 'Automatically build and deploy a Java web application from source control to a running server, removing manual deployment steps.',
    tech: ['GitHub', 'Jenkins', 'Apache Maven', 'Apache Tomcat', 'Git', 'CI/CD', 'Java', 'WAR'],
    steps: [
      'Integrated GitHub with Jenkins.',
      'Configured a Jenkins pipeline.',
      'Automatically retrieved source code on trigger.',
      'Built the Java application using Maven.',
      'Generated a deployable WAR file.',
      'Automated deployment to Apache Tomcat using Tomcat Manager.',
      'Reduced manual deployment effort and improved deployment consistency.'
    ],
    learning: 'Understanding how a CI/CD pipeline turns a git push into a running application, end to end.',
    github: 'https://github.com/Janani-303/Jenkins-Deployment-Project-Documentation'
  },
  proj4: {
    title: 'CI/CD Pipeline Automation for Java Web Application Deployment using Docker',
    flow: 'GitHub &rarr; Jenkins &rarr; Maven &rarr; WAR File &rarr; Dockerfile &rarr; Docker Image &rarr; Docker Container &rarr; Running Application',
    objective: 'Extend the Jenkins CI/CD pipeline to package the application as a Docker image and automate container deployment.',
    tech: ['GitHub', 'Jenkins', 'Maven', 'Docker', 'Dockerfile', 'Apache Tomcat', 'CI/CD'],
    steps: [
      'Integrated GitHub with Jenkins.',
      'Retrieved application source code automatically.',
      'Used Maven to compile, test and package the application.',
      'Generated a WAR file.',
      'Created a Dockerfile using Apache Tomcat as the base image.',
      'Built a Docker image containing the application.',
      'Automated container deployment through Jenkins.',
      'Configured Docker port mapping and verified availability through a browser.',
      'Implemented container lifecycle management — stopping/removing the previous container before deploying the latest version.'
    ],
    learning: 'How containerization simplifies consistent deployment, and how Jenkins can drive the full build → image → container lifecycle.',
    github: 'https://github.com/Janani-303/Docker-Deployment-Project-Documentation'
  }
};

const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    const data = projectData[btn.dataset.modal];
    if (!data) return;

    modalContent.innerHTML = `
      <h3>${data.title}</h3>
      <p class="m-flow">${data.flow}</p>
      <h4>Objective</h4>
      <p style="color:var(--muted); font-size:0.92rem;">${data.objective}</p>
      <h4>Technologies Used</h4>
      <div class="tag-row small">${data.tech.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <h4>Implementation</h4>
      <ul>${data.steps.map(s => `<li>${s}</li>`).join('')}</ul>
      <h4>Key Learning</h4>
      <p style="color:var(--muted); font-size:0.92rem;">${data.learning}</p>
      ${data.github ? `<a class="btn btn-primary" href="${data.github}" target="_blank" rel="noopener">View Project Documentation &rarr;</a>` : ''}
    `;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ============ CONTACT FORM (mailto handoff — no backend) ============
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('cf-name').value;
  const email = document.getElementById('cf-email').value;
  const subject = document.getElementById('cf-subject').value;
  const message = document.getElementById('cf-message').value;

  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailto = `mailto:janujeeva230@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
});
