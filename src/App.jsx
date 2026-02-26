import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('intro')
  const [theme, setTheme] = useState('dark')
  const [visitedSections, setVisitedSections] = useState(new Set(['intro']))
  const [didYouKnowIndex, setDidYouKnowIndex] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId)
    setVisitedSections(prev => new Set([...prev, sectionId]))
  }

  const didYouKnow = [
    "React was created by Jordan Walke, a software engineer at Facebook, in 2011",
    "The name 'React' comes from its ability to 'react' to changes in data",
    "React Virtual DOM makes updates faster by minimizing direct DOM manipulation",
    "You can use React for VR and 3D applications with React Three Fiber",
    "React has over 200,000+ stars on GitHub - one of the most popular libraries!",
    "Facebook, Instagram, Netflix, and Airbnb all use React",
    "React Native lets you build mobile apps using the same React concepts",
    "The first version of React was released to the public in 2013"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setDidYouKnowIndex(prev => (prev + 1) % didYouKnow.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const progress = (visitedSections.size / 6) * 100

  // Interactive Demo Components
  const InteractiveCounter = () => {
    const [count, setCount] = useState(0)
    return (
      <div className="interactive-demo">
        <h4>🎮 Try It: Counter Demo</h4>
        <div className="demo-controls">
          <button onClick={() => setCount(count - 1)}>-</button>
          <span className="demo-value">{count}</span>
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
        <p className="demo-hint">Click buttons to see state in action!</p>
      </div>
    )
  }

  const InteractiveProps = () => {
    const [greeting, setGreeting] = useState('Hello')
    const [name, setName] = useState('React')
    return (
      <div className="interactive-demo">
        <h4>🎮 Try It: Props Demo</h4>
        <div className="demo-controls">
          <input 
            type="text" 
            placeholder="Greeting" 
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="demo-result">
          <h3>{greeting}, {name}! 👋</h3>
        </div>
        <p className="demo-hint">Type to see props changing the output!</p>
      </div>
    )
  }

  const InteractiveTodo = () => {
    const [todos, setTodos] = useState([
      { id: 1, text: 'Learn React basics', done: false },
      { id: 2, text: 'Build my first app', done: false }
    ])
    const [newTodo, setNewTodo] = useState('')

    const addTodo = () => {
      if (newTodo.trim()) {
        setTodos([...todos, { id: Date.now(), text: newTodo, done: false }])
        setNewTodo('')
      }
    }

    const toggleTodo = (id) => {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, done: !todo.done } : todo
      ))
    }

    return (
      <div className="interactive-demo">
        <h4>🎮 Try It: Todo List Demo</h4>
        <div className="demo-controls">
          <input 
            type="text" 
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className={todo.done ? 'done' : ''}>
              <label>
                <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
                {todo.text}
              </label>
            </li>
          ))}
        </ul>
        <p className="demo-hint">Add items and click checkboxes to complete them!</p>
      </div>
    )
  }

  const ColorPicker = () => {
    const [color, setColor] = useState('#61dafb')
    const colors = ['#61dafb', '#f093fb', '#4caf50', '#ff6b6b', '#ffd93d', '#6c5ce7']
    return (
      <div className="interactive-demo">
        <h4>🎮 Try It: Color Picker</h4>
        <div className="color-picker">
          {colors.map(c => (
            <button 
              key={c}
              className="color-btn"
              style={{ backgroundColor: c, transform: color === c ? 'scale(1.2)' : 'scale(1)' }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
        <div className="demo-result" style={{ color, borderColor: color }}>
          <h3>Current Color: {color}</h3>
        </div>
        <p className="demo-hint">Click a color to change the text!</p>
      </div>
    )
  }

  const sections = [
    { id: 'intro', title: 'Introduction', icon: '📚' },
    { id: 'components', title: 'Components', icon: '🧩' },
    { id: 'props', title: 'Props', icon: '📦' },
    { id: 'state', title: 'State', icon: '⚡' },
    { id: 'hooks', title: 'Hooks', icon: '🪝' },
    { id: 'events', title: 'Events', icon: '🎯' },
  ]

  const commonMistakes = [
    { title: "Modifying State Directly", wrong: "state.count++", right: "setState(prev => prev + 1)", tip: "Always use the setter function, never modify state directly" },
    { title: "Forgetting Keys in Lists", wrong: "items.map(item => <Item {...item} />)", right: "items.map(item => <Item key={item.id} {...item} />)", tip: "Keys help React identify which items changed" },
    { title: "Using Index as Key", wrong: "items.map((item, i) => <Item key={i} ... />)", right: "items.map(item => <Item key={item.id} ... />)", tip: "Use stable IDs instead of array indices" },
    { title: "Not Cleaning Up Effects", wrong: "useEffect(() => { setInterval(...) }, [])", right: "useEffect(() => { const id = setInterval(...); return () => clearInterval(id); }, [])", tip: "Always return cleanup function for subscriptions" }
  ]

  const shortcuts = [
    { key: "Ctrl/Cmd + S", action: "Save file" },
    { key: "Ctrl/Cmd + Z", action: "Undo" },
    { key: "Ctrl/Cmd + Y", action: "Redo" },
    { key: "Ctrl/Cmd + /", action: "Toggle comment" },
    { key: "Alt + Up/Down", action: "Move line" },
    { key: "Ctrl/Cmd + D", action: "Select next occurrence" }
  ]

  const content = {
    intro: (
      <div className="content-section">
        <h2>📚 Welcome to Learn React</h2>
        <p className="intro-text">
          React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".
        </p>
        
        <div className="did-you-know">
          <span className="tip-badge">💡 Did You Know?</span>
          <p className="tip-content">{didYouKnow[didYouKnowIndex]}</p>
        </div>

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

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">200K+</span>
            <span className="stat-label">GitHub Stars</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">12+</span>
            <span className="stat-label">Years Active</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">10M+</span>
            <span className="stat-label">Weekly Downloads</span>
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

        <div className="component-anatomy">
          <h3>🔍 Component Anatomy</h3>
          <div className="anatomy-visual">
            <div className="anatomy-part import">
              <span className="anatomy-label">Import</span>
              <code>import React from 'react'</code>
            </div>
            <div className="anatomy-part function">
              <span className="anatomy-label">Function</span>
              <code>function MyComponent() {'{'} ... {'}'}</code>
            </div>
            <div className="anatomy-part return">
              <span className="anatomy-label">Return</span>
              <code>return <div>...</div></code>
            </div>
            <div className="anatomy-part export">
              <span className="anatomy-label">Export</span>
              <code>export default MyComponent</code>
            </div>
          </div>
        </div>
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

        <InteractiveProps />

        <div className="props-flow">
          <h3>📊 Props Flow</h3>
          <div className="flow-diagram">
            <div className="flow-node parent">Parent Component</div>
            <div className="flow-arrow">↓ passes props ↓</div>
            <div className="flow-node child">Child Component</div>
          </div>
        </div>
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

        <InteractiveCounter />
        <InteractiveTodo />
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

        <div className="rules-section">
          <h3>📜 Rules of Hooks</h3>
          <div className="rules-list">
            <div className="rule-item">
              <span className="rule-number">1</span>
              <div className="rule-content">
                <strong>Only call Hooks at the top level</strong>
                <p>Don't call Hooks inside loops, conditions, or nested functions</p>
              </div>
            </div>
            <div className="rule-item">
              <span className="rule-number">2</span>
              <div className="rule-content">
                <strong>Only call Hooks from React functions</strong>
                <p>Call them from React functional components or custom Hooks</p>
              </div>
            </div>
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

        <ColorPicker />

        <div className="events-grid">
          <h3>🎪 Common Events</h3>
          <div className="event-card">
            <code>onClick</code>
            <span>Click event</span>
          </div>
          <div className="event-card">
            <code>onChange</code>
            <span>Input change</span>
          </div>
          <div className="event-card">
            <code>onSubmit</code>
            <span>Form submit</span>
          </div>
          <div className="event-card">
            <code>onKeyDown</code>
            <span>Key press</span>
          </div>
          <div className="event-card">
            <code>onMouseOver</code>
            <span>Hover event</span>
          </div>
          <div className="event-card">
            <code>onFocus</code>
            <span>Element focus</span>
          </div>
        </div>
      </div>
    ),
  }

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <div className="header-left">
          <button 
            className="sidebar-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <div className="logo">
            <span className="react-logo">⚛️</span>
            <h1>Learn React</h1>
          </div>
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

      <div className="app-container">
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <h3>📖 Navigation</h3>
            <div className="progress-indicator">
              <span>Progress: {Math.round(progress)}%</span>
            </div>
          </div>
          <nav className="sidebar-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`sidebar-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => handleSectionChange(section.id)}
              >
                <span className="sidebar-icon">{section.icon}</span>
                <span className="sidebar-title">{section.title}</span>
                {visitedSections.has(section.id) && (
                  <span className="sidebar-checkmark">✓</span>
                )}
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <p className="sidebar-tip">
              💡 Tip: Click sections to navigate
            </p>
          </div>
        </aside>

        <main className="main-content">
          {content[activeSection]}
          
          <div className="common-mistakes">
            <h3>⚠️ Common Mistakes to Avoid</h3>
            {commonMistakes.slice(0, 2).map((mistake, i) => (
              <div key={i} className="mistake-card">
                <h4>{mistake.title}</h4>
                <div className="mistake-code wrong">
                  <span className="mistake-label">❌ Wrong:</span>
                  <code>{mistake.wrong}</code>
                </div>
                <div className="mistake-code right">
                  <span className="mistake-label">✅ Right:</span>
                  <code>{mistake.right}</code>
                </div>
                <p className="mistake-tip">💡 {mistake.tip}</p>
              </div>
            ))}
          </div>

          <div className="shortcuts-panel">
            <h3>⌨️ Keyboard Shortcuts</h3>
            <div className="shortcuts-grid">
              {shortcuts.map((shortcut, i) => (
                <div key={i} className="shortcut-item">
                  <kbd>{shortcut.key}</kbd>
                  <span>{shortcut.action}</span>
                </div>
              ))}
            </div>
          </div>

          <footer className="footer">
            <p>Start your React journey today! 🚀</p>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
              Visit Official React Docs →
            </a>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default App