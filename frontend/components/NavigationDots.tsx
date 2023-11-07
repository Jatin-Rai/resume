import React from "react";

interface NavigationDotsProps {
  active: string;
}

const NavigationDots = ({ active }: NavigationDotsProps) => {
  return (
    <div className="app__navigation">
      {["home", "about", "portfolio", "skills", "contact"].map(
        (item, index) => (
          <a
            href={`#${item}`}
            key={item + index}
            className="app__navigation-dot"
            style={active === item ? { backgroundColor: "#00BFFF" } : {}}
          />
        )
      )}
    </div>
  );
};

export default NavigationDots;
