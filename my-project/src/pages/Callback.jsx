function Parent() {
    const handleDataFromChild = (message) => {
        alert("Message from child: " + message);
    };

    return <Child sendMessage={handleDataFromChild} />;
}

function Child({ sendMessage }) {
    return (
        <button onClick={() => sendMessage("Hello Parent!")}>
            Send Message
        </button>
    );
}

export default Parent;