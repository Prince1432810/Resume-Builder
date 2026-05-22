import { Text, View } from "@react-pdf/renderer";

const tipTapStyles = {
    paragraph: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 2,
    },
    bulletRow: {
        flexDirection: "row",
        marginBottom: 2,
        alignItems: "flex-start",
    },
    bulletDot: {
        marginRight: 4,
        fontSize: 8.7,
        color: "#444444",
        lineHeight: 1.65,
    },
    orderedNum: {
        marginRight: 4,
        fontSize: 8.7,
        color: "#444444",
        lineHeight: 1.65,
    },
    listContent: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
    },
};

// Renders a text leaf node with its marks (bold, italic, underline)
const parseTextNode = (node, index) => {
    if (!node || node.type !== "text") return null;

    const style = { fontSize: 8.7, color: "#444444", lineHeight: 1.65 };
    const marks = node.marks || [];

    const isBold = marks.some((m) => m.type === "bold");
    const isItalic = marks.some((m) => m.type === "italic");
    const isUnderline = marks.some((m) => m.type === "underline");

    if (isBold && isItalic) style.fontFamily = "Helvetica-BoldOblique";
    else if (isBold) style.fontFamily = "Helvetica-Bold";
    else if (isItalic) style.fontFamily = "Helvetica-Oblique";

    if (isUnderline) style.textDecoration = "underline";

    return (
        <Text key={index} style={style}>
            {node.text}
        </Text>
    );
};

// Renders inline children of a paragraph — returns an array of Text nodes
const parseInlineContent = (nodes = []) =>
    nodes.map((node, i) => parseTextNode(node, i)).filter(Boolean);

// Renders the inline text content of a listItem (flattens paragraph wrappers)
const parseListItemContent = (listItemNode) => {
    if (!listItemNode?.content) return null;
    // A listItem contains paragraph nodes — flatten them into inline Text
    return listItemNode.content.map((child, i) => {
        if (child.type === "paragraph") {
            return parseInlineContent(child.content || []);
        }
        return parseTextNode(child, i);
    });
};

const parseNode = (node, index) => {
    if (!node) return null;

    // ── Plain text leaf ──
    if (node.type === "text") {
        return parseTextNode(node, index);
    }

    // ── Paragraph ──
    if (node.type === "paragraph") {
        const isEmpty =
            !node.content ||
            node.content.every((c) => !c.text || c.text.trim() === "");
        return (
            <View key={index} style={tipTapStyles.paragraph}>
                {isEmpty ? (
                    <Text style={{ fontSize: 8.7 }}> </Text>
                ) : (
                    parseInlineContent(node.content || [])
                )}
            </View>
        );
    }

    // ── Bullet List ──
    if (node.type === "bulletList") {
        return (
            <View key={index} style={{ marginLeft: 8, marginBottom: 2 }}>
                {node.content?.map((item, i) => (
                    <View key={i} style={tipTapStyles.bulletRow}>
                        <Text style={tipTapStyles.bulletDot}>•</Text>
                        <View style={tipTapStyles.listContent}>
                            {parseListItemContent(item)}
                        </View>
                    </View>
                ))}
            </View>
        );
    }

    // ── Ordered List ──
    if (node.type === "orderedList") {
        return (
            <View key={index} style={{ marginLeft: 8, marginBottom: 2 }}>
                {node.content?.map((item, i) => (
                    <View key={i} style={tipTapStyles.bulletRow}>
                        <Text style={tipTapStyles.orderedNum}>{i + 1}.</Text>
                        <View style={tipTapStyles.listContent}>
                            {parseListItemContent(item)}
                        </View>
                    </View>
                ))}
            </View>
        );
    }

    // ── List Item (standalone, shouldn't normally hit this) ──
    if (node.type === "listItem") {
        return (
            <View key={index} style={{ flexDirection: "row", flexWrap: "wrap" }}>
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
                style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 2 }}
            >
                {node.content?.map((child, i) => (
                    <Text key={i} style={{ fontFamily: "Helvetica-Bold", fontSize }}>
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
        parsed = content;
    } else {
        try {
            parsed = JSON.parse(content);
        } catch {
            return (
                <Text style={{ fontSize: 8.7 }}>
                    {String(content).replace(/<[^>]*>/g, "")}
                </Text>
            );
        }
    }

    if (!parsed?.content) return null;

    return (
        <View>{parsed.content.map((node, i) => parseNode(node, i))}</View>
    );
};

export default TipTapParser;