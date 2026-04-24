// import { Text, View } from '@react-pdf/renderer'
// import { styles } from '../ResumeOutputPage/ResumePDF'

// const parseNode = (node, index) => {

//   if (node.type === 'text') {
//     let style = {};
//     if (node.marks) {
//       node.marks.forEach(mark => {
//         if (mark.type === 'bold') style.fontWeight = 'bold';
//         if (mark.type === 'italic') style.fontStyle = 'italic';
//         if (mark.type === 'underline') style.textDecoration = 'underline';
//       });
//     }
//     return <Text key={index} style={style}>{node.text}</Text>;
//   }

//   if (node.type === 'paragraph') {
//     return (
//       <View key={index} style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 2 }}>
//         {node.content ? node.content.map((child, i) => parseNode(child, i)) : <Text> </Text>}
//       </View>
//     );
//   }

//   if (node.type === 'bulletList') {
//     return (
//       <View key={index} style={{ marginLeft: 10 }}>
//         {node.content ? node.content.map((item, i) => (
//           <View key={i} style={{ flexDirection: 'row' }}>
//             <Text style={{ marginRight: 4 }}>•</Text>
//             <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
//               {item.content ? item.content.map((child, j) => parseNode(child, j)) : null}
//             </View>
//           </View>
//         )) : null}
//       </View>
//     );
//   }

//   if (node.type === 'orderedList') {
//     return (
//       <View key={index} style={{ marginLeft: 10 }}>
//         {node.content ? node.content.map((item, i) => (
//           <View key={i} style={{ flexDirection: 'row' }}>
//             <Text style={{ marginRight: 4 }}>{i + 1}.</Text>
//             <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
//               {item.content ? item.content.map((child, j) => parseNode(child, j)) : null}
//             </View>
//           </View>
//         )) : null}
//       </View>
//     );
//   }

//   if (node.type === 'listItem') {
//     return (
//       <View key={index} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
//         {node.content ? node.content.map((child, i) => parseNode(child, i)) : null}
//       </View>
//     );
//   }

//   if (node.type === 'heading') {
//     return (
//       <View key={index} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
//         {node.content ? node.content.map((child, i) => (
//           <Text key={i} style={{ fontWeight: 'bold', fontSize: 13 }}>
//             {child.text}
//           </Text>
//         )) : null}
//       </View>
//     );
//   }

//   return null;
// };

// const TipTapParser = ({ content }) => {
//   if (!content) return null;

//   let parsed;
//   try {
//     parsed = JSON.parse(content);
//   } catch {
//     // if not JSON, return plain text
//     return <Text style={{ fontSize: 10 }}>{content.replace(/<[^>]*>/g, '')}</Text>;
//   }

//   if (!parsed.content) return null;

//   return (
//     <View>
//       {parsed.content.map((node, i) => parseNode(node, i))}
//     </View>
//   );
// };

// export default TipTapParser;











import { Text, View } from '@react-pdf/renderer'

// Inline styles instead of importing from ResumePDF to avoid circular dependency
const tipTapStyles = {
  paragraph: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 1,
  },
  bulletDot: {
    marginRight: 4,
    fontSize: 10,
  },
  orderedNum: {
    marginRight: 4,
    fontSize: 10,
  },
  listContent: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
}

const parseNode = (node, index) => {
  if (!node) return null

  // ── Plain text leaf ──
  if (node.type === 'text') {
    const style = {}
    if (node.marks) {
      node.marks.forEach(mark => {
        if (mark.type === 'bold')      style.fontFamily = 'Times-Bold'
        if (mark.type === 'italic')    style.fontFamily = 'Times-Italic'
        if (mark.type === 'underline') style.textDecoration = 'underline'
        // bold + italic combo
        if (mark.type === 'bold' && node.marks.find(m => m.type === 'italic')) {
          style.fontFamily = 'Times-BoldItalic'
        }
      })
    }
    return (
      <Text key={index} style={{ fontSize: 10, ...style }}>
        {node.text}
      </Text>
    )
  }

  // ── Paragraph ──
  if (node.type === 'paragraph') {
    return (
      <View key={index} style={tipTapStyles.paragraph}>
        {node.content
          ? node.content.map((child, i) => parseNode(child, i))
          : <Text> </Text>}
      </View>
    )
  }

  // ── Bullet List ──
  if (node.type === 'bulletList') {
    return (
      <View key={index} style={{ marginLeft: 8 }}>
        {node.content?.map((item, i) => (
          <View key={i} style={tipTapStyles.bulletRow}>
            <Text style={tipTapStyles.bulletDot}>•</Text>
            <View style={tipTapStyles.listContent}>
              {item.content?.map((child, j) => parseNode(child, j))}
            </View>
          </View>
        ))}
      </View>
    )
  }

  // ── Ordered List ──
  if (node.type === 'orderedList') {
    return (
      <View key={index} style={{ marginLeft: 8 }}>
        {node.content?.map((item, i) => (
          <View key={i} style={tipTapStyles.bulletRow}>
            <Text style={tipTapStyles.orderedNum}>{i + 1}.</Text>
            <View style={tipTapStyles.listContent}>
              {item.content?.map((child, j) => parseNode(child, j))}
            </View>
          </View>
        ))}
      </View>
    )
  }

  // ── List Item (nested paragraphs inside li) ──
  if (node.type === 'listItem') {
    return (
      <View key={index} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {node.content?.map((child, i) => parseNode(child, i))}
      </View>
    )
  }

  // ── Heading ──
  if (node.type === 'heading') {
    const level = node.attrs?.level || 1
    const fontSize = level === 1 ? 14 : level === 2 ? 12 : 11
    return (
      <View key={index} style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 2 }}>
        {node.content?.map((child, i) => (
          <Text key={i} style={{ fontFamily: 'Times-Bold', fontSize }}>
            {child.text}
          </Text>
        ))}
      </View>
    )
  }

  // ── Hard break ──
  if (node.type === 'hardBreak') {
    return <Text key={index}>{'\n'}</Text>
  }

  return null
}

const TipTapParser = ({ content }) => {
  if (!content) return null

  let parsed
  try {
    parsed = JSON.parse(content)
  } catch {
    return (
      <Text style={{ fontSize: 10 }}>
        {content.replace(/<[^>]*>/g, '')}
      </Text>
    )
  }

  if (!parsed?.content) return null

  return (
    <View>
      {parsed.content.map((node, i) => parseNode(node, i))}
    </View>
  )
}

export default TipTapParser
