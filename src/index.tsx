import { Application } from "@wapl/sdk";
import { Header, useRoomStore } from "@wapl/core";
import { styled } from "@wapl/ui";

const handleMount = () => {
  console.log("Mounted!");
};

const handleUnMount = () => {
  console.log("Unmounted!");
};

const handleOnError = (err, info, props) => {};

const AppContainer = () => {
  const roomStore = useRoomStore();

  return (
    <Application
      onMount={handleMount}
      onUnmount={handleUnMount}
      onError={handleOnError}
    >
      <Header>Header Area</Header>
      <Body>
        Body Area
        <div>Hello llama</div>
        <img src={`${PUBLIC_URL}/llama.jpeg`} />
      </Body>
    </Application>
  );
};

export default AppContainer;

const Body = styled.div`
  padding: 20px;
`;
