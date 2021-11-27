export const firstParagraph : JSX.Element = 
<p>
    The Kalman Filter is an algorithm that allows you to estimate the state of a system even under
    very uncertain conditions. It was developed by Hungarian engineer Rudolf Kalman in 1960.
</p>

export const secondParagraph : JSX.Element =
<p>
    It works by using a two-step process: First, it predicts the future state of the system
    using a model on the system in <a href="https://en.wikipedia.org/wiki/State-space_representation">
    State-Space form</a>. The uncertainty of the prediction is also calculated based on the <a href="https://en.wikipedia.org/wiki/Covariance">covariance</a> of
    the process disturbances, which are modelled as a <a href="https://en.wikipedia.org/wiki/Normal_distribution">Gaussian Distribution</a> with
    0 mean.
</p>

export const stateImage : JSX.Element = <img src="/assets/statespacewnoise.png" alt="state space system with disturbances"/>

export const thirdParagraph : JSX.Element = 
<p>
    In the second step we use the actual measurement to update the estimation. Based on the covariance of
    the measurement noise we can give different levels of preference to the model estimation or the 
    measurement. Indeed, if the measurement noise has 0 covariance the filter will output the same values
    as the measurements, and if the process disturbances have 0 covariance the filter will return the output
    of its model <b>(you can try it using the sliders!)</b>.
</p>

export const fourthParagraph : JSX.Element = 
<p>
    If all the assumptions of the Kalman Filter are correct (which means that the model is perfectly accurate,
    the noise and disturbances are normally distributed with the specified covariance, etc.), the filter is optimal.
    This means it's the best possible estimation you can get!
</p>

export const fifthParagraph : JSX.Element = 
<p>
    It must be noted that we are <i>slightly</i> cheating in this scenario. Since everything is modelled, we have
    perfect knowledge of the disturbance and measurement covariances (not to mention of the model), which makes
    the filter calculations more accurate. In real processes, finding these covariances (or, at the very least, 
    finding initial values that will give good results) is usually the most difficult step for having a good filter.
</p>