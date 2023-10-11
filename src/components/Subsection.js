const Subsection = (props) => {

    const {title} = props;
    return (
    <article>
        <h3> {title} </h3>
        <textarea id="message" name="message" className="subsection-text"/>
    </article>    
    )
}

export default Subsection