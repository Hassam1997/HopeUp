import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle, View, ScrollView } from "react-native"
import { Header, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: "#fff",
  flex: 1,
}

const container: ViewStyle = { flex: 1 }
const headerText: TextStyle = { fontSize: 18, fontWeight: "bold", color: color.themeColor }
const headerSubText: TextStyle = { fontSize: 17, color: color.themeColor }
const table2: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginHorizontal: 25,
  marginVertical: 12,
}
const headerSub2Text: TextStyle = { fontSize: 15, color: color.themeColor }

export const TermsandconditionsScreen = observer(function TermsandconditionsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <View style={{ flex: 1 }}>
        <Header
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
          headerText="Terms and Conditions"
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{ marginHorizontal: 15, fontSize: 16, padding: 12, color: "black" }}>
            Hope Up is an unprecedented platform, keep the Hope Up community clean. Stay Positive
            and remember we all are trying.
            <Text style={headerText}>
              {"\n\n"}OVERVIEW{"\n"}
            </Text>
            This website is operated by Hope Up L.L.C. Throughout the site, we may refer to the
            terms “we”, “us”, “our”, “Hope Up”, “Hope Up L.L.C.” meaning to Hope Up. Hope Up offers
            its website and/or apps and all information, tools and services available from this site
            and/or applications to you, the user, conditioned upon your acceptance of all terms,
            conditions, policies and notices stated here. By creating a profile on Hope Up, you
            agree to be bound by the following Terms and Conditions. Our Terms and Conditions apply
            to all users of Hope Up, including without limitation to users who are browsers,
            vendors, customers, merchants, and/ or contributors of content. Please read these Terms
            and Conditions carefully after creating a profile or using our website and/or
            applications. By accessing or using any part of Hope Up, you agree to be bound by these
            Terms and Conditions. If you do not agree to all the terms and conditions of this
            agreement, then you may not access the website and/or applications or use any services
            provided by Hope Up. If these Terms and Conditions are considered an offer, acceptance
            is expressly limited to these Terms and Conditions. Any new features or tools which are
            added to Hope Up shall also be subject to the Terms and Conditions. You may review the
            most current version of the Terms and Conditions at any time on this page. Hope Up
            L.L.C. reserves the right to update, change, modify or replace any part of our Terms and
            Conditions by making updates and/or changes to our website and/or applications. It is
            the user’s responsibility to check this page periodically for changes. Your continued
            use of or access to the website and/or applications after any changes represents
            acceptance of those changes.
            <Text style={headerText}>
              {"\n\n"}VIDEO, ONLINE STORE & CLASSIFIED AD TERMS {"\n"}
            </Text>
            By using Hope Up you are agreeing to these Terms and Conditions, that you are at least
            the age of majority in your state or place of residence, and/or you have given us your
            consent to allow any of your minor dependents to use our site and/or applications. You
            may not use our website and/or applications for any illegal or unauthorized purposes nor
            may you, in the use of the Service, violate any laws in your jurisdiction (including but
            not limited to copyright laws). You must not transmit any worms, viruses and/or any code
            of a destructive nature. A breach or violation of any of the Terms will result in an
            immediate termination of your account.
            <Text style={headerText}>
              {"\n\n"}GENERAL CONDITIONS{"\n"}
            </Text>
            Hope Up L.L.C. reserves the right to block anyone for any reason at any time. You
            understand that your content (not including credit card information), may be transferred
            unencrypted and involve (a) transmissions over various networks; (b) changes to conform
            and adapt to technical requirements of connecting networks or devices. Credit card
            information is always encrypted during transfer over networks. You agree not to
            reproduce, duplicate, copy, sell, resell or exploit any portion of Hope Up, or use of
            the Service without express written consent. The headings used in this agreement are
            included for convenience only and will not limit or otherwise affect these Terms.
            <Text style={headerText}>
              {"\n\n"}COMPLETENESS, ACCURACY AND TIMELINESS OF INFORMATION {"\n"}
            </Text>
            Hope Up L.L.C. is not responsible if information on our site and/or applications is not
            accurate, complete or current. The content on this site and/or application is provided
            for general information only. The content on this site and/or application should not be
            relied upon or used as the sole basis for making decisions. Reliance on the material on
            this site is at your own risk. Our site and/or applications may contain historical
            information. Historical information, often, is not current and is provided for reference
            only. We reserve the right to modify the contents of this site and/or applications at
            any time, but there is no obligation to update any information on our site. You agree
            that it is your responsibility to monitor changes to our site and/or applications.
            BILLING AND ACCOUNT INFORMATION ACCURACY We reserve the right to refuse any order. Hope
            Up L.L.C. may, in our sole discretion, limit or cancel orders and/or block users.
            Restrictions may include but not limited to orders placed by or under the same customer
            profile, the same credit card, and/or orders that use the same billing and/or shipping
            address. If we decide to make a change or cancel an order, we may attempt to contact you
            by the e-mail and/or billing address/phone number provided when the order was made. We
            reserve the right to limit or prohibit orders, in our sole judgment. You agree to
            provide accurate, current, and complete purchase and account information for all
            purchases made on Hope Up. You agree to update account and other information, including
            your email address, credit card numbers and expiration dates, so that we can complete
            your transactions and contact you as needed.
            <Text style={headerText}>
              {"\n\n"}PROHIBITED USES {"\n"}
            </Text>
            In combination with the other prohibitions set forth in the Terms and Conditions, you
            are prohibited from using the Hope Up site and/or applications and its content: (i) for
            any unlawful purpose; (ii) to request others to do or participate in any unlawful acts;
            (iii) to violate any international, federal, provincial or state regulations, rules,
            laws, or local ordinances; (iv) to steal or violate Hope Up L.L.C. intellectual property
            rights or the intellectual property rights of others; (v) to abuse, harass, insult,
            defame, harm, intimidate, disparage, slander, or discriminate against another based on
            gender, sexual orientation, religion, race, ethnicity, age, national origin, or
            disability; (vi) to submit misleading or untrue information; (vii) to transmit or upload
            viruses or any other type of hostile code that will or could be used in any way that
            will affect the functionality or operation of Hope Up or of any related website and/or
            application including interference with or to bypass the security features; (viii) to
            track and/or collect personal information of others; (ix) to spam, phish, pharm, scrape,
            spider, crawl, or pretext; (ix) for any obscene or immoral purpose. We reserve the right
            to terminate your use of the Service for violating any of the prohibited uses.
            <Text style={headerText}>
              {"\n\n"}PROHIBITED ITEMS{"\n"}
            </Text>
            In combination with the other prohibitions set forth in the Terms and Conditions, you
            are prohibited from using the Hope Up site and/or applications and its content for
            advocating, distributing, any of the following items: (i) Alcohol and alcoholic
            products; (ii) tobacco or variations of tobacco products; (iii) Vaporizing liquid that
            do not contain nicotine; (v) Instruments containing nicotine; (vi) E-cigarettes,
            e-hookahs, or other vape products; (vii) Pharmaceuticals/prescription drugs; (viii)
            Medical devices; (ix) Behind the counter drugs; (x) Products and/or ingredients to
            create drugs; (xi) Homemade food or food supplements, Vitamins, Diet products; muscle
            enhancers; (xii) Home remedies or “miracle” cures; (xiii) Stolen items; (xiv) Stolen
            intellectual property; (xv) Firearms and firearm parts and accessories including but
            limited too airsoft and bb guns, knives including but not limited to switchblades and
            butterfly knives, explosives; self-defense weapons, any item that is a safety hazard;
            (xvi) Adult toys; (xvii) Offensive items; (xviii) Humans including but not limited to
            human body parts organs, cells, blood, body fluids; (xix) Digital items including but
            not limited to items where the order is realized electronically or via download; (xx)
            Live animals; (xxi) Financial products including but not limited to services such as
            bonds, securities, insurance, banknotes or coins of any currency, gift cards, pre-paid
            cards, coupons, gambling; (xxii) age restricted products, (xxiii) products designed to
            bypass copyright protection, (xxiv) anything used for identity theft, (xxv) items not in
            your possession (dropshipping, advertisements for items being sought, items you do not
            have in your currently in your possession). We reserve the right to terminate your use
            of the Service for violating any of the prohibited uses.
            <Text style={headerText}>
              {"\n\n"}THIRD-PARTY TOOLS {"\n"}
            </Text>
            We may provide you with access to third-party tools. We do not monitor nor have any
            control nor input. You acknowledge and agree that we provide access to such tools “as
            is” without any warranties, representations or conditions of any kind and without any
            endorsement. Hope Up L.L.C. has no liability whatsoever arising from or relating to the
            use of third-party tools.
            <Text style={headerText}>
              {"\n\n"}THIRD-PARTY LINKS {"\n"}
            </Text>
            There may be links on Hope Up that may direct you to third-party websites that are not
            affiliated with us. We are not responsible for examining or evaluating third-party
            links. Hope Up L.L.C. will not have any liability or take responsibility for any
            third-party materials or websites. Hope Up L.L.C is not liable for any harm or damages
            relating to the purchase or use of goods, resources, content, services or any other
            transactions made in connection with any third-party websites. Complaints, claims,
            concerns, or questions regarding third-party products or practices should be directed to
            the third-party.
            <Text style={headerText}>
              {"\n\n"}USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS{"\n"}
            </Text>
            You agree that your comments will be positive and said in a way to upbuild without being
            critical. You agree that your comments will not violate the right of any third-party,
            including but not limited to copyright, trademark, privacy, personality or other
            personal or proprietary right. You agree that your comments will not contain unlawful,
            obscene or abusive content, nor contain any computer virus or other malware that could
            in any way affect the operation of the Hope Up site and/or applications. You may not use
            a false e-mail address, pretend to be someone other than yourself, and/or mislead in any
            comment. You are solely responsible for any comments you make furthermore Hope Up L.L.C.
            takes no responsibility and assumes no liability nor risk for any comments posted by you
            or any third-party.
            <Text style={headerText}>
              {"\n\n"}INACCURACIES, ERRORS AND OMISSIONS {"\n"}
            </Text>
            Occasionally there may be information on the Hope Up site and/or applications that
            contains typographical errors, inaccuracies or omissions. Hope Up reserves the right to
            correct any errors, or inaccuracies and to change and/or update information at any time
            without prior notice.
            <Text style={headerText}>
              {"\n\n"}SHIPPING{"\n"}
            </Text>
            <Text style={headerSubText}>
              {"\n"}SELLERS{"\n"}
            </Text>
            After your item has been purchased on Hope Up, we will send you a printable shipping
            label. Ship your product as soon as possible within 2 days of the purchase date. Hope Up
            will provide shipping label options based on the products weight, packaging and size of
            the box. Use the Hope Up prepaid shipping label. Our rates with UPS are low and fixed.
            When your item is sold, Hope Up will email the label to you.
            <Text style={headerSub2Text}>
              {"\n\n"}USING THE SHIPPING LABEL{"\n"}
            </Text>
            Use the shipping label depending on the size and weight of the package. Shipping labels
            should include packaging and is the greater of actual or shipping weight.
            {"\n"}
            {"\n"}
          </Text>
          <View style={[table2, { backgroundColor: "#a5a5a5", padding: 3 }]}>
            <Text style={{ fontSize: 12, color: "#fff" }}>ITEM TYPE</Text>
            <Text style={{ fontSize: 12, color: "#fff" }}>WEIGHT CLASSES</Text>
            <Text style={{ fontSize: 12, color: "#fff" }}>SERVICE TYPE</Text>
          </View>
          <View style={table2}>
            <Text style={{ fontSize: 12, color: "black" }}>Small</Text>
            <Text style={{ fontSize: 12, color: "black" }}>1 – 9 lbs</Text>
            <Text style={{ fontSize: 12, color: "black" }}>Sure Post</Text>
          </View>
          <View style={table2}>
            <Text style={{ fontSize: 12, color: "black" }}>Medium</Text>
            <Text style={{ fontSize: 12, color: "black" }}>*10 - 20 lbs</Text>
            <Text style={{ fontSize: 12, color: "black" }}>Ground</Text>
          </View>
          <View style={table2}>
            <Text style={{ fontSize: 12, color: "black" }}>Heavy</Text>
            <Text style={{ fontSize: 12, color: "black" }}>*21 – 49 lbs</Text>
            <Text style={{ fontSize: 12, color: "black" }}>Ground</Text>
          </View>
          <Text style={{ marginHorizontal: 15, fontSize: 16, padding: 12, color: "black" }}>
            {"\n"}*For items over 10 pounds that do not fit in the mailbox use the following formula
            to calculate the shipping labels correct weight:
            {"\n\n"}Length x Width x Height = Total Volume / Shipping Divisor.
            {""}
          </Text>
          <View style={[table2, { backgroundColor: "#a5a5a5", padding: 3 }]}>
            <Text style={{ fontSize: 12, color: "#fff" }}>CARRIER</Text>
            <Text style={{ fontSize: 12, color: "#fff" }}>SHIPPING DIVISOR</Text>
          </View>
          <View style={table2}>
            <Text style={{ fontSize: 12, color: "black" }}>UPS</Text>
            <Text style={{ fontSize: 12, color: "black" }}>166</Text>
          </View>
          <Text style={{ marginHorizontal: 15, fontSize: 16, padding: 12, color: "black" }}>
            {"\n"}The next steps:
            {"\n"}1. Box and package the item.
            {"\n"}
            {"    "}a. Attach the shipping label.
            {"\n"}2. Ship the item within 2 days of the purchase date.
            {"\n"}3. The shipment will be confirmed by UPS. Once the seller ships the item in the
            app mark the item ‘Shipped’.
            {"\n"}
            <Text style={headerSubText}>
              {"\n"}SHIPPING PROTECTION{"\n"}
            </Text>
            UPS offers $100 shipping protection.
            <Text style={headerText}>
              {"\n\n"}BUYERS{"\n"}
            </Text>
            The buyer pays for the cost of the shipping label and choose which shipping option works
            best for them.
            <Text style={headerSubText}>
              {"\n\n"}YOUR ADDRESS{"\n"}
            </Text>
            Sellers send items directly to buyers and have access to your delivery information. To
            protect the buyer’s privacy, the seller is Not able to see the buyer’s delivery
            information once the transaction is complete.
            <Text style={headerSubText}>
              {"\n\n"}REACH{"\n"}
            </Text>
            Hope Up ships to the US and all 50 states and District of Columbia. Currently, Hope Up
            L.L.C. do not ship to PO/APO/FPO nor US territories addresses.
            <Text style={headerText}>
              {"\n\n"}RETURNS{"\n"}
            </Text>
            Hope Up L.L.C. return policy is 2 days after the delivery date. If 2 days from your
            delivery date have pasted since your purchase, unfortunately we can’t offer you a refund
            nor return. For an item to be suitable for return, your item must be unused and in the
            same condition that you received it. The item must also be in the original packaging.
            Certain types of goods are not eligible for being returned. Perishable goods such as
            food, flowers, newspapers or magazines are not eligible for return. To complete your
            return, we require users to fill out the return form and if your return is granted then
            we will send you return instructions. Do NOT send your purchase back to the seller
            without first completing the return form and hearing from Hope Up L.L.C.
            <Text style={headerSubText}>
              {"\n\n"}SHIPPING{"\n"}
            </Text>
            To return your product, you should mail your product back to the user who sold the item
            AFTER we have confirmed your return. The buyer will be responsible for paying shipping
            costs as well as the Hope Up 10% fee. Shipping costs and the Hope Up fee are
            non-refundable.
            <Text style={headerSubText}>
              {"\n\n"}REFUNDS{"\n"}
            </Text>
            Once you complete the return form, we will send you an email to notify you that we have
            approved or rejected you for a return/refund. Instructions will be sent on returning the
            item to the seller. If you are approved, then your refund will be processed after the
            product has been delivered to the seller, and a credit will automatically be applied to
            your credit card or original method of payment, within a certain amount of days. The
            buyer will not be refunded the 10% Hope Up fee or shipping cost.
            <Text style={headerSubText}>
              {"\n\n"}LATE OR MISSING REFUNDS{"\n"}
            </Text>
            If you haven’t received a refund yet, first check your bank account again. Then contact
            your credit card company, it may take some time before your refund is officially posted.
            Next contact your bank. There is often some processing time before a refund is posted.
            If you’ve done all of this and you still have not received your refund yet, please
            contact us at returns/refunds@hopeup.net.
            <Text style={headerText}>
              {"\n\n"}HOLDING FUNDS{"\n"}
            </Text>
            Hope Up LLC wants to ensure buyers and sellers on the “Online Store” have a good
            experience. To guarantee buyers and sellers are both safeguarded, Hope Up will hold
            funds for purchased items for 2 days after delivery. Once the 2-day holding window has
            passed the buyer will not be able to return the item or receive a refund.
            <Text style={headerText}>
              {"\n\n"}PRICING STRUCTURE{"\n"}
            </Text>
            <Text style={headerSubText}>
              {"\n"}SELLERS{"\n"}
            </Text>
            Hope Up gets 20% of the sell price once the item has been delivered and 2 day Holding
            window has passed. If the item purchased is returned, the buyer will be refunded their
            money after the item has been shipped back to the seller excluding shipping cost and the
            Hope Up fee.
            <Text style={headerSubText}>
              {"\n"}BUYERS{"\n"}
            </Text>
            The buyer pays Hope Up 10% of the sell price at the time of checkout. If the item
            purchased is returned, the buyer will be refunded their money after the item has been
            delivered back to the seller. The buyer will not be refunded the 10% Hope Up fee nor
            shipping cost.
            <Text style={headerText}>
              {"\n"}PRIVACY POLICY {"\n"}
            </Text>
            This Privacy Policy describes how your personal information is collected, used, and
            shared when you visit or make a purchase from the Hope Up site and/or applications.
            <Text style={headerSubText}>
              {"\n\n"}PERSONAL INFORMATION COLLECTED {"\n"}
            </Text>
            When you visit the Hope Up site and/or we automatically collect certain information
            about your device, including information such as IP address, time zone. Additionally, as
            you browse, we collect information about the individual web pages or products that you
            view, search terms referred you on the Hope Up site and/or applications, and information
            about how you interact with the Hope Up site and/or applications. We refer to this
            automatically-collected information as “Device Information.” We collect Device
            Information using the following technologies: - “Log files” track actions occurring on
            the Hope Up site and/or applications, and collect data including your IP address,
            browser type, Internet service provider, referring/exit pages, and date/time stamps. -
            “Web beacons”, “tags”, and “pixels” are electronic files used to record information
            about how you browse the Hope Up site and/or applications. When you make a purchase or
            attempt to make a purchase through Hope Up, we collect certain information from you,
            including your name, billing address, shipping address, payment information (including
            credit card numbers) email address, and phone number. We refer to this information as
            “Order Information”. When we talk about “Personal Information” in this Privacy Policy,
            we are talking both about Device Information and Order Information.
            <Text style={headerSubText}>
              {"\n\n"}USE OF PERSONAL INFORMATION {"\n"}
            </Text>
            Hope Up uses the Order Information that we collect generally to fulfill any orders
            placed through the Site (including processing your payment information, arranging for
            shipping, and providing you with invoices and/or order confirmations). In addition, Hope
            Up uses this Order Information to: - Communicate with you - Screen orders for potential
            risk or fraud - When in line with the preferences you have shared with us, provide you
            with information or advertising relating to products or services. Hope Up may use the
            Device Information that we collect to help screen for potential risk and fraud (in
            mainly, your IP address), and more generally to improve the Hope Up site and/or
            applications.
            <Text style={headerSubText}>
              {"\n\n"}SHARING PERSONAL INFORMATION{"\n"}
            </Text>
            We DO NOT share your Personal Information with third parties. Hope Up may share your
            Personal Information to comply with applicable laws and regulations, such as to respond
            to a subpoena, search warrant or other lawful request for information.
            <Text style={headerSubText}>
              {"\n\n"}BEHAVIORAL ADVERTISING {"\n"}
            </Text>
            Hope Up uses your Personal Information to provide you with content and products that may
            be of interest to you.
            <Text style={headerSubText}>
              {"\n\n"}DO NOT TRACK {"\n"}
            </Text>
            Please note that Hope Up L.L.C. does not alter our Site’s data collection even when a Do
            Not Track signal is on your browser.
            <Text style={headerSubText}>
              {"\n\n"}DATA RETENTION {"\n"}
            </Text>
            When you place an order Hope Up, we will maintain your Order Information for our records
            unless and until you ask us to delete this information.
            <Text style={headerSubText}>
              {"\n\n"}CHANGES {"\n"}
            </Text>
            Hope Up L.L.C may update this privacy policy from time to time.
            <Text style={headerSubText}>
              {"\n\n"}MINORS{"\n"}
            </Text>
            Hope Up is not intended for individuals under the age of 13.
            <Text style={headerText}>
              {"\n\n"}LIMITATION OF LIABILITY{"\n"}
            </Text>
            Hope Up L.L.C. does not guarantee, represent or warrant that your use of our site and/or
            applications will be timely, secure, error-free or uninterrupted. Hope Up L.L.C. does
            not warrant that the results obtained from the use of our site and/or applications will
            be accurate or reliable. You agree that Hope Up may remove its site and/or applications
            for indefinite periods of time or cancel it site and/or applications at any time,
            without notice. You agree that your use of, or inability to use, the Hope Up site and/or
            applications is solely your risk. All content, products and services delivered, watched,
            posted on the Hope Up site and/or applications are (except as expressly stated by us)
            provided 'as is' and 'as available' for use, without any form of warranties, conditions
            or representation, of any kind, either express nor implied, including all implied
            warranties and/or conditions of quality, and/or purpose for a certain, durability,
            title, and non-infringement. The Hope Up L.L.C., employees, affiliates, contractors,
            interns, suppliers, licensors or service providers shall NOT be liable for any loss,
            injury, claim, and/or any direct, indirect, incidental, punitive, special, or
            consequential damages of any kind. This also includes, with no limitation to lost
            revenue, profits, savings, costs, data and/or any damage similar, whether in contract,
            strict liability, tort including negligence, or otherwise, arising from your use of any
            of the Hope Up site and/or applications or any products rendered using the Hope Up site
            and/or applications, or for any claim related in any way.
            <Text style={headerText}>
              {"\n\n"}INDEMNIFICATION{"\n"}
            </Text>
            You agree to indemnify, defend and hold harmless Hope Up L.L.C, it employees, interns,
            contractors, subcontractors, partners, suppliers, officers, directors, licensors,
            service providers, harmless from any claim or demand, including attorneys’ fees, made by
            any third-party attributed to or from your breach of the Terms and Conditions or the
            documents they incorporate by reference, or your violation of any law or the rights of a
            third-party.
            <Text style={headerText}>
              {"\n\n"}SEVERABILITY{"\n"}
            </Text>
            In the event that any provision of these Terms and Conditions is determined to be
            unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the
            fullest extent permitted by applicable law, and the unenforceable portion shall be
            deemed to be severed from these Terms and Conditions, such determination shall not
            affect the validity and enforceability of any other remaining provisions.
            <Text style={headerText}>
              {"\n\n"}TERMINATION{"\n"}
            </Text>
            The Hope Up Terms and Conditions are effective unless and until terminated by either you
            or Hope Up. You may end these Terms and Conditions at any time by notifying Hope Up that
            you no longer would like to use the Hope Up site and/or applications, or when you cease
            using our site and/or applications. If in our sole judgment you fail, or are suspected
            to have failed, to follow with any term or provision of the Terms and Conditions, Hope
            Up L.L.C may terminate this agreement at any time without warning.
            <Text style={headerText}>
              {"\n\n"}ENTIRE AGREEMENT{"\n"}
            </Text>
            The failure of Hope Up L.L.C. to exercise or enforce any right or provision of these
            Terms and Conditions does not constitute a waiver of such right or provision. These
            Terms and Conditions and any policies and/or operating rules published by Hope Up on
            this site and/or applications or in respect to services offered by Hope Up constitutes
            the entire agreement. There is an agreement between you and Hope Up L.L.C. to govern
            your use of Hope Up, superseding any prior agreements, communications either written or
            oral, between you and Hope Up L.L.C. (including, but not limited to, any prior versions
            of the Terms and Conditions). Any ambiguities in the interpretation of these Terms and
            Conditions shall not be construed against the drafting party.
            <Text style={headerText}>
              {"\n\n"}GOVERNING LAW{"\n"}
            </Text>
            These Terms and Conditions and any separate agreements that we provide shall be governed
            by Hope Up L.L.C. in accordance with the laws of United States.
            <Text style={headerText}>
              {"\n\n"}CHANGES TO TERMS AND CONDITIONS{"\n"}
            </Text>
            You can review the most current version of the Terms and Conditions at any time on this
            page. Hope Up L.L.C. reserves the right to update, change or modify any part of these
            Terms and Conditions by updating and making changes to our website and/or applications.
            It is the user’s responsibility to check the Hope Up site and/or applications
            periodically for changes. Your continued use or access to our website and/or
            applications constitutes acceptance of these Terms and Conditions and of those changes.
          </Text>
        </ScrollView>
      </View>
    </Screen>
  )
})
