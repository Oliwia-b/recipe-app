interface Props {
  items: Set<string>;
  heading: string;
  onItemClick?: (item: string) => void;
}

function ListGroup({ items, heading, onItemClick }: Props) {
  return (
    <div className="list-group">
      <h2>{heading}</h2>
      {items.size === 0 ? (
        <p>No item found</p>
      ) : (
        <div className="list-container">
          <ul>
            {[...items].map((item) => (
              <li key={item}>
                <div className="ingredient">
                  <span>{item}</span>
                  <button
                    className="delete-btn"
                    onClick={() => onItemClick?.(item)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ListGroup;
