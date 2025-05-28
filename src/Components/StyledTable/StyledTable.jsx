import "./StyledTable.scss"
import styled from "styled-components";
export default function StyledTable({projects}) {
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
          </Tr>
        </Thead>
        <tbody>
        {projects.map(({ id, name, startDate, endDate, technology, status, links }) => (
            <Tr key={id}>
              <Td>{name}</Td>
              <Td>{startDate}</Td>
              <Td>{endDate}</Td>
              <Td>{technology.join(", ")}</Td>
              <Td>{status}</Td>
              <Td>
                {links.map(({ label, url }) => (
                    <Link key={url} href={url} target="_blank" rel="noopener noreferrer">
                      {label}
                    </Link>
                ))}
              </Td>
            </Tr>
        ))}
        </tbody>
      </Table>
    </div>
  );
}