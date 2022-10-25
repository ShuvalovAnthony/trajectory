import { createSignal, createResource, createEffect, For } from "solid-js";

async function fetchTopic(id: number) {
  return (await fetch(`http://127.0.0.1:8000/api/v1/topic/${id}`)).json();
}

const App = () => {
  const [topicId, setTopicId] = createSignal(1);
  const deacrement = () => setTopicId(topicId() - 1);
  const increment = () => setTopicId(topicId() + 1);
  const show_title = () => alert(topic().title);
  const [topic] = createResource(topicId, fetchTopic);


  return (
    <div class="container-fluid">
      <div class="container">
        <div class="row">
          <div class="col">
            <button type="button" class="btn btn-primary" onClick={deacrement}>
              Previous
            </button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-primary" onClick={increment}>
              Next
            </button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-primary" onClick={show_title}>
              Alert
            </button>
          </div>
        </div>
        <div class="row">
          <p></p>
          <span>{topic.loading && "Loading..."}</span>
          <div>
            {topic() && (
              <section>
                <h1>{topic().title}</h1>
                <p>{topic().category}</p>
                <p>{topic().content}</p>
              </section>
            )}
          </div>
        </div>
        <div class="row">
          Topic number {topicId}
        </div>
      </div>
      <p></p>
    </div>
  );
};

export default App; 
