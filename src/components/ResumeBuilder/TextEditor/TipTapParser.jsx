import { Text, View } from "@react-pdf/renderer";

// Inline styles instead of importing from ResumePDF to avoid circular dependency
const tipTapStyles = {
    paragraph: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 2,
    },
    bulletRow: {
        flexDirection: "row",
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
        flexDirection: "row",
        flexWrap: "wrap",
    },
};

const parseNode = (node, index) => {
    if (!node) return null;

    // ── Plain text leaf ──
    if (node.type === "text") {
        const style = {};
        if (node.marks) {
            node.marks.forEach((mark) => {
                if (mark.type === "bold") style.fontFamily = "Times-Bold";
                if (mark.type === "italic") style.fontFamily = "Times-Italic";
                if (mark.type === "underline")
                    style.textDecoration = "underline";
                // bold + italic combo
                if (
                    mark.type === "bold" &&
                    node.marks.find((m) => m.type === "italic")
                ) {
                    style.fontFamily = "Times-BoldItalic";
                }
            });
        }
        return (
            <Text key={index} style={{ fontSize: 10, ...style }}>
                {node.text}
            </Text>
        );
    }

    // ── Paragraph ──
    if (node.type === "paragraph") {
        return (
            <View key={index} style={tipTapStyles.paragraph}>
                {node.content ? (
                    node.content.map((child, i) => parseNode(child, i))
                ) : (
                    <Text> </Text>
                )}
            </View>
        );
    }

    // ── Bullet List ──
    if (node.type === "bulletList") {
        return (
            <View key={index} style={{ marginLeft: 8 }}>
                {node.content?.map((item, i) => (
                    <View key={i} style={tipTapStyles.bulletRow}>
                        <Text style={tipTapStyles.bulletDot}>•</Text>
                        <View style={tipTapStyles.listContent}>
                            {item.content?.map((child, j) =>
                                parseNode(item, j),
                            )}
                        </View>
                    </View>
                ))}
            </View>
        );
    }

    // ── Ordered List ──
    if (node.type === "orderedList") {
        return (
            <View key={index} style={{ marginLeft: 8 }}>
                {node.content?.map((item, i) => (
                    <View key={i} style={tipTapStyles.bulletRow}>
                        <Text style={tipTapStyles.orderedNum}>{i + 1}.</Text>
                        <View style={tipTapStyles.listContent}>
                            {item.content?.map((child, j) =>
                                parseNode(child, j),
                            )}
                        </View>
                    </View>
                ))}
            </View>
        );
    }

    // ── List Item (nested paragraphs inside li) ──
    if (node.type === "listItem") {
        return (
            <View
                key={index}
                style={{ flexDirection: "row", flexWrap: "wrap" }}
            >
                {node.content?.map((child, i) => parseNode(child, i))}
            </View>
        );
    }

    // ── Heading ──
    if (node.type === "heading") {
        const level = node.attrs?.level || 1;
        const fontSize = level === 1 ? 14 : level === 2 ? 12 : 11;
        return (
            <View
                key={index}
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginBottom: 2,
                }}
            >
                {node.content?.map((child, i) => (
                    <Text
                        key={i}
                        style={{ fontFamily: "Times-Bold", fontSize }}
                    >
                        {child.text}
                    </Text>
                ))}
            </View>
        );
    }

    // ── Hard break ──
    if (node.type === "hardBreak") {
        return <Text key={index}>{"\n"}</Text>;
    }

    return null;
};

const TipTapParser = ({ content }) => {
    if (!content) return null;

    let parsed;

    if (typeof content === "object" && content !== null) {
        // Already a parsed object, use directly
        parsed = content;
    } else {
        try {
            parsed = JSON.parse(content);
        } catch {
            return (
                <Text style={{ fontSize: 10 }}>
                    {String(content).replace(/<[^>]*>/g, "")}
                </Text>
            );
        }
    }

    if (!parsed?.content) return null;
    return <View>{parsed.content.map((node, i) => parseNode(node, i))}</View>;
};
export default TipTapParser;
