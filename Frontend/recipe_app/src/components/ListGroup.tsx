interface Props {
  items: Set<string>;
  heading: string;
  onItemClick?: (item: string) => void;
}

function ListGroup({ items, heading, onItemClick }: Props) {
  return (
    <div>
      <h2>{heading}</h2>
      {items.size === 0 ? (
        <p>No item found</p>
      ) : (
        <ul>
          {[...items].map((item) => (
            <li key={item}>
              {item}

              <button onClick={() => onItemClick?.(item)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListGroup;
