import "@components/StyledTable/StyledTable.scss"
import styled from "styled-components";
export default function StyledTable({projects, onUpdate, onDelete}) {
  function getFormattedUrl(url) {
    return url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;
  }
  const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

  const Thead = styled.thead`
  background-color: #282c34;
  color: white;
`;

  const Th = styled.th`
  padding: 12px 15px;
  text-align: left;
`;

  const Td = styled.td`
  padding: 12px 15px;
    color:white;
  border-bottom: 1px solid #ddd;
`;

  const Tr = styled.tr`

`;

  const Link = styled.a`
  margin-right: 12px;
  color: #61dafb;
  text-decoration: none;
`;

  return (
    <div className="styledTable">
      <h2>Projects</h2>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Start Date</Th>
            <Th>End Date</Th>
            <Th>Technology</Th>
            <Th>Status</Th>
            <Th>Links</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <tbody>
        {projects.map(({id,name, startDate, endDate, technology, status, links }) =>  (
                  <Tr key={id}>
                    <Td>{name}</Td>
                    <Td>{startDate}</Td>
                    <Td>{endDate}</Td>
                    <Td>{technology.map(t=>t.name).join(", ")}</Td>
                    <Td>{status}</Td>
                    <Td>
                      {links?.map(( url ) => (
                          <Link key={url} href={getFormattedUrl(url)} target="_blank" rel="noopener noreferrer">
                            {url}
                          </Link>
                      ))}
                    </Td>
                    <Td>
                      <button onClick={() => onUpdate(id)}>Update</button>
                      <button onClick={() => onDelete(id)}>Delete</button>
                    </Td>
                  </Tr>
              ))}
        </tbody>
      </Table>
    </div>
  );
}