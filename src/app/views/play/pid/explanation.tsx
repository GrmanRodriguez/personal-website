export const firstParagraph : JSX.Element =
<p>
    The Proportional-Integral-Derivative <i>(PID)</i> controller is one of the most
    popular strategies for <a href="https://en.wikipedia.org/wiki/Control_loop">control loops</a> in 
    most fields of engineering.
</p>;

export const secondParagraph : JSX.Element =
<p>
    The concept behind PID controllers is very intuitive: In essence, it states that the further away
    your measurements are from your goal or setpoint, the higher must be the input signal in order to
    reach that setpoint.
</p>;

export const thirdParagraph : JSX.Element =
<p>
    To do this calculation, we define an error variable as the difference between the measured state and
    the desired state:
</p>

export const firstImage : JSX.Element =
<img src="/assets/error.png" alt="e(t)=SP(t)-x(t)"/>

export const fourthParagraph : JSX.Element =
<p>
    The first term is the <b>Proportional</b> part, controlled by the proportional gain <code>Kp</code>.
    This term is proportional to the current value of the error.
</p>

export const fifthParagraph : JSX.Element = 
<p>
    The second term is the <b>Integral</b> part, governed by the integral gain <code>Ki</code>. Adding
    this term takes into account the whole history of the error, which helps the controller reach the
    setpoint precisely (a Proportional controller won't be able to do this by itself, you can check this
    by setting Ki to 0, there will be a small error always!).
</p>

export const sixthParagrah : JSX.Element = 
<p>
    The last term is the <b>Derivative</b> part, handled with the derivative gain <code>Kd</code>. 
    This term takes into account the rate of change of the error, and will thus prevent the error from
    rapidly increasing.
</p>

export const seventhParagraph : JSX.Element =
<p>
    Adding all of these terms in mathematical terms we get the following:
</p>

export const secondImage : JSX.Element =
<img src="/assets/pid.png" alt="u(t)=Kp*x(t)+Ki*int(x(t))+Kd*dx/dt"/>

export const lastParagraph : JSX.Element =
<p>
    <b>Game: </b> Try to find a set of gains that will leave the system with no overshoot (that is, the value of
    the state does not go over the setpoint at any point). <i>Hint: This is a system with mass 1 and damping factor of 0.1</i>
</p>