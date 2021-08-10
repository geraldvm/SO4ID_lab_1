export const postSpacesData = async (descrip) => {
    
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
        },
        body: JSON.stringify({ description: descrip })
    };
    fetch('http://localhost:1616/spaces', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));
};