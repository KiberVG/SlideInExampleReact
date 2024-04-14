// App.js
import { useState, useEffect } from 'react';

function App() {

  const [isVisible, setIsVisible] = useState(false);

  /* 
   Use effect is a hook that we use to manage side effects in a functional component.
   This useEffect hook takes in one required parameter and one optional paramater. 
   The required parameter is the "effect" that you want to happen. This is usually something related to
   the system and not the UI. Usually like browser functions, API calls, or manipulating the DOM.
   
   The optional parameter is known as a "dependency array". Usually, you put some state in here. 
   If the state changes, then the effect will run. If you leave this argument out altogether, 
   the effect will run at every render. If you leave it in but make the array empty like it is below, 
   then the effect will run once when the component is first rendered or "mounted".
  */

   /* Remember that functions are data. This is returning an anonymous function that just so 
      happens to have other functions inside of it. It still has only one return value. 
    */
  useEffect(() => { 

    const handleScroll = () => {
      /* 
       Getting the DOM element with ID of "slide-in-element", scroll down to find it. <section id='slide-in-element'>
       Alternatively, you can also use useRef() to get the DOM element and use it almost exactly the same way.
       The difference is that React doesn't keep track of the DOM directly, it uses a fake or virtual dom and then changes
       the real DOM later. So do not use getElementbyID to delete things or add new things, because React will not know
       that anything has changed in the real DOM, so this might cause an errow. However, for something like this it should
       be okay as long as we are not deleting, adding, or modifying anything. But the best practice would be to use
       the useRef() hook. Using useRef will also have us avoid getting the element each time and might make performance faster.
      */
      const element = document.getElementById('slide-in-element');
      // Must check if the element exists, because it may not have rendered yet.
      // If it doesn't exist yet then we return nothing.
      if (!element) return; 

      // This basically returns how far the element is from the top
      // and left of the window.
      const elementRect = element.getBoundingClientRect();

      // Getting the height of the entire current window.
      const viewportHeight = window.innerHeight;

      /* Check if the element is visible. 
       The element is visible if the distance of the element from the top of the screen is less than the
       total height of the screen at any given moment. This means that after you've seen and scrolled past the 
       element, it will still be considered "visible". This won't be false unless you scroll all the way to top past
       the element. It's a little hard to understand, but read the docs and try drawing it out yourself. Either way,
       it's not that important, just know that this checks to see that the thing is visible.
      */
      const isVisible = elementRect.top < viewportHeight;

      // Change the state to visible or not visible so we can trigger a rerender.
      setIsVisible(isVisible);
    };
    
    /* The only thing this hook does. Only when the component first renders, the hook will attach a function to the 
     actual DOM. This function is not a React function, this is a javascript function that directly effects the DOM.
     It takes the entire window and listens for when there is a scroll, if there is a scroll, then the function called
     "handleScroll" will run. We defined this function above. 'scroll' is just one of the things we can do here. We could
     also do 'click' or 'mouseover'... etc. As mentioned previously, we don't usually want to affect the DOM directly
     without React knowing. This could cause some overlap with other event handlers. But this can give us a basic
     understanding of what is going on behind the scenes and shouldn't cause any problems. The best practice would be to
     use a React library or built in React fetaures only.
     */
    window.addEventListener('scroll', handleScroll);


    /* Finally, this is also something that is optional about the useEffect() hook. Inside of your function you can choose
     to return another function that will happen when the component "unmounts". This mean when the component is taken off 
     of the screen. For example, if the user switches pages then the component will unmount. If the user comes back then 
     the component will mount.

     So, if the event handler is no longer in use after we unmount, then we should remove the event listener from the browser.
     To avoid clashing with other things.
    */
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []); // This last argument is the empty dependency array. React will only do the effect once during the initial render


  return (
    <div className="App">
      <header className="header">
        <h1>My Personal Website</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section id="about" className="section">
        <h2>About Me</h2>
        <p>This is where you can introduce yourself and talk about your skills, interests, and experiences.</p>
      </section>

      <section id="projects" className="section">
        <h2>Projects</h2>
        <div className="project-list">
          <div className="project">
            <h3>Project 1</h3>
            <p>Description of Project 1</p>
          </div>
          <div className="project">
            <h3>Project 2</h3>
            <p>Description of Project 2</p>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <h2>Contact Me</h2>
        <p>You can reach me at example@email.com</p>
      </section>

      <section id="about" className="section">
        <h2>About Me</h2>
        <p>This is where you can introduce yourself and talk about your skills, interests, and experiences.</p>
      </section>

      <section id="projects" className="section">
        <h2>Projects</h2>
        <div className="project-list">
          <div className="project">
            <h3>Project 1</h3>
            <p>Description of Project 1</p>
          </div>
          <div className="project">
            <h3>Project 2</h3>
            <p>Description of Project 2</p>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <h2>Contact Me</h2>
        <p>You can reach me at example@email.com</p>
      </section>

      <section id="about" className="section">
        <h2>About Me</h2>
        <p>This is where you can introduce yourself and talk about your skills, interests, and experiences.</p>
      </section>

      {/*This is the element that we want to slide in*/}
      <section id="slide-in-element" className={(isVisible? "slide-in": 'slide-section')}>
        <h2>This should slide in</h2>
        <div className="project-list">
          <div className="project">
            <h3>Project 1</h3>
            <p>Description of Project 1</p>
          </div>
          <div className="project">
            <h3>Project 2</h3>
            <p>Description of Project 2</p>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <h2>Contact Me</h2>
        <p>You can reach me at example@email.com</p>
      </section>
      <section id="contact" className="section">
        <h2>Contact Me</h2>
        <p>You can reach me at example@email.com</p>
      </section>
      <section id="contact" className="section">
        <h2>Contact Me</h2>
        <p>You can reach me at example@email.com</p>
      </section>
      <section id="contact" className="section">
        <h2>Contact Me</h2>
        <p>You can reach me at example@email.com</p>
      </section>
      <section id="contact" className="section">
        <h2>Contact Me</h2>
        <p>You can reach me at example@email.com</p>
      </section>

      <section id="contact" className="section">
        <h2>Contact Me</h2>
        <p>You can reach me at example@email.com</p>
      </section>
      <section id="contact" className="section">
        <h2>Contact Me</h2>
        <p>You can reach me at example@email.com</p>
      </section>
      <section id="contact" className="section">
        <h2>Contact Me</h2>
        <p>You can reach me at example@email.com</p>
      </section>
      <section id="contact" className="section">
        <h2>Contact Me</h2>
        <p>You can reach me at example@email.com</p>
      </section>
      <section id="contact" className="section">
        <h2>Contact Me</h2>
        <p>You can reach me at example@email.com</p>
      </section>


      <footer className="footer">
        <p>&copy; 2024 My Personal Website</p>
      </footer>
    </div>
  );
}

export default App;

// CSS Styles
import './App.css';

