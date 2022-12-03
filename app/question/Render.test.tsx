import Render from "./Render";

import { render } from "@testing-library/react";

test("Simple Text", () => {
  const result = render(<Render>Simple Text</Render>);

  expect(result.container).toMatchSnapshot();
});

describe("마크다운 렌더링", () => {
  test("제목이 잘 표시되어야 함", () => {
    const result = render(
      <Render>{`# heading 1
  
  ## heading 2
  
  ### heading 3`}</Render>
    );

    expect(result.container).toMatchSnapshot();
  });

  test("굵게가 잘 표시되어야 함", () => {
    const result = render(<Render>{`**bold**`}</Render>);
    expect(result.container).toMatchSnapshot();

    // screen.debug();
  });
});

describe("수학 렌더링 (KaTeX)", () => {
  test("Inline Math 가 잘 렌더링되어야 함", () => {
    const result = render(<Render>{`$x^2$`}</Render>);

    expect(result.container).toMatchSnapshot();
  });

  test("Block Math 가 잘 렌더링되어야 함", () => {
    const result = render(<Render>{`$$x^2$$`}</Render>);

    expect(result.container).toMatchSnapshot();
  });
});

describe("배열 렌더링", () => {
  test("일반 배열이 잘 렌더링되어야 함.", () => {
    const result = render(<Render>{[`this is one`, "this is two"]}</Render>);

    expect(result.container).toMatchSnapshot();
  });
});
