interface Props {
  items: string[];
  heading: string;
  onItemClick?: (item: string) => void;
}

function ListGroup({ items, heading, onItemClick }: Props) {
  return (
    <div>
      <h2>{heading}</h2>
      {items.length === 0 ? (
        <p>No item found</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li onClick={() => onItemClick?.(item)} key={item}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListGroup;
