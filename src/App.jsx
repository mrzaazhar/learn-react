import { useState } from 'react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('intro')
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const sections = [
    { id: 'intro', title: 'Introduction', icon: '📚' },
    { id: 'components', title: 'Components', icon: '🧩' },
    { id: 'props', title: 'Props', icon: '📦' },
    { id: 'state', title: 'State', icon: '⚡' },
    { id: 'hooks', title: 'Hooks', icon: '🪝' },
    { id: 'events', title: 'Events', icon: '🎯' },
  ]

  const content = {
    intro: (
      <div className="content-section">
        <h2>📚 Welcome to Learn React</h2>
        <p className="intro-text">
          React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".
        </p>
        <div className="feature-grid">
          <div className="feature-card">
            <span className="feature-icon">⚛️</span>
            <h3>Component-Based</h3>
            <p>Build encapsulated components that manage their own state</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🚀</span>
            <h3>Declarative</h3>
            <p>Design simple views for each state in your application</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔄</span>
            <h3>React Native</h3>
            <p>Learn once, write anywhere - build mobile apps too</p>
          </div>
        </div>
      </div>
    ),
    components: (
      <div className="content-section">
        <h2>🧩 Components</h2>
        <p className="section-description">
          Components are the building blocks of any React application. They let you split the UI into independent, reusable pieces.
        </p>
        <div className="code-block">
          <pre>{`// Functional Component
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// With Arrow Function
const Welcome = () => {
  return <h1>Hello, World!</h1>;
};`}</pre>
        </div>
        <ul className="key-points">
          <li>Components must return a single parent element</li>
          <li>Use PascalCase for component names</li>
          <li>Components can be reused throughout your app</li>
        </ul>
      </div>
    ),
    props: (
      <div className="content-section">
        <h2>📦 Props</h2>
        <p className="section-description">
          Props (properties) are read-only data passed from parent to child components.
        </p>
        <div className="code-block">
          <pre>{`// Parent Component
function App() {
  return <Welcome name="Alice" age={25} />;
}

// Child Component
function Welcome({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}`}</pre>
        </div>
        <ul className="key-points">
          <li>Props make components reusable</li>
          <li>Props are immutable (read-only)</li>
          <li>Use object destructuring for cleaner code</li>
        </ul>
      </div>
    ),
    state: (
      <div className="content-section">
        <h2>⚡ State</h2>
        <p className="section-description">
          State is data that changes over time, specific to a component. When state changes, React re-renders the component.
        </p>
        <div className="code-block">
          <pre>{`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}</pre>
        </div>
        <ul className="key-points">
          <li>State is managed within the component</li>
          <li>Use useState hook to add state to functional components</li>
          <li>Never modify state directly - always use the setter function</li>
        </ul>
      </div>
    ),
    hooks: (
      <div className="content-section">
        <h2>🪝 Hooks</h2>
        <p className="section-description">
          Hooks are functions that let you use state and other React features in functional components.
        </p>
        <div className="hooks-grid">
          <div className="hook-card">
            <h3>useState</h3>
            <p>Add state to functional components</p>
            <code>const [state, setState] = useState(initial)</code>
          </div>
          <div className="hook-card">
            <h3>useEffect</h3>
            <p>Perform side effects in components</p>
            <code>useEffect(() =&gt; &#123; ... &#125;, [deps])</code>
          </div>
          <div className="hook-card">
            <h3>useContext</h3>
            <p>Access context values without nesting</p>
            <code>const value = useContext(MyContext)</code>
          </div>
          <div className="hook-card">
            <h3>useRef</h3>
            <p>Access DOM elements or persist values</p>
            <code>const ref = useRef(initialValue)</code>
          </div>
        </div>
      </div>
    ),
    events: (
      <div className="content-section">
        <h2>🎯 Events</h2>
        <p className="section-description">
          React events are named using camelCase and you pass a function as the event handler.
        </p>
        <div className="code-block">
          <pre>{`function Button() {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Button clicked!');
  };

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}

// Common Events:
// onClick, onChange, onSubmit, onMouseOver
// onKeyDown, onFocus, onBlur`}</pre>
        </div>
        <ul className="key-points">
          <li>Event names are camelCase (onClick, not onclick)</li>
          <li>You pass a function, not a string</li>
          <li>Event handlers receive synthetic event objects</li>
        </ul>
      </div>
    ),
  }

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <div className="logo">
          <span className="react-logo">⚛️</span>
          <h1>Learn React</h1>
        </div>
        <div className="header-actions">
          <p className="subtitle">Master modern web development with React</p>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
            <span className="theme-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </header>

      <nav className="navigation">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-button ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            <span className="nav-icon">{section.icon}</span>
            {section.title}
          </button>
        ))}
      </nav>

      <main className="main-content">
        {content[activeSection]}
      </main>

      <footer className="footer">
        <p>Start your React journey today! 🚀</p>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          Visit Official React Docs →
        </a>
      </footer>
    </div>
  )
}

export default App
