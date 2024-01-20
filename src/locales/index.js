import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const lnglocal = localStorage.getItem("lng");

i18n.use(initReactI18next).init({
  resources: {
    ar: {
      translation: {
        English: "English",
        Arabic: "العربية",
        Persian: "فارسی",
        code: "Ar",
        Home: "الرئيسية",
        exit: "خروج",
        cancel: "الغاء",
        ok: "موافق",
        menu: "القائمة",
        register: "سجل الآن",
        download: "تحميل",
        formFullName: "الاسم الكامل",
        formPhoneNumber: "رقم الموبايل",
        formEmail: "الايميل",
        AboutUs: "من نحن",
        JoinUs: "انضم لنا",
        send: "ارسال",
        sending: "جار الارسال",
        Location: "الموقع",
        Type: "النوع",
        Bedrooms: "الغرف",
        MinPrice: "اقل سعر",
        MaxPrice: "اعلى سعر",
        Message: "الرسالة",
        Subject: "العنوان",
        Gender: "الجنس",
        Purpose: "العقد",
        Balconey: "البلكونة",
        Price: "السعر",
        PropertyTitle: "عنوان العقار",
        PropertyDescription: "نص عن العقار",
        ErrorPleaseReload: " حدث خطأ ما, نرجو إعادة تحميل الصفحة",
        NoProperties: "عذرا, لم يتم إضافة أية عقارات",
        Search: "بحث",
        Loading: "جاري التحميل ...",
        Size: "المساحة",
        All: "الجميع",
        Bathrooms: "الحمامات",
        Clear: "مسح",
        Filter: "بحث متقدم",
        PricePer: "السعر للـ",
        PriceOfUnit: "سعر الواحدة",
        RegulatoryInformation: "معلومات تنظيمية",
        PermitNumber: "رقم التصريح",
        DEDNo: "DED No",
        ReraNo: "Rera No",
        BRNNo: "BRN No",
        FindMore: "إكتشف المزيد",
        AdvantagesServices: "الميزات و الخدمات",
        Description: "الشرح",
        PropertyInformation: "ملعومات العقار",
        Address: "العنوان",
        AddedOn: "تاريخ الإضافة",
        Completion: "حالة العقار",
        RentFrequency: "مدة الإيجار",
        MinimumNumberOfChecks: "أقل عدد للشكات",
        MaximumNumberOfChecks: "أكبر عدد للشكات",
        Handover: "موعد التسليم",
        VacantStatus: "متاح للسكن",
        Developer: "المطور",
        PaymentPlan: "خطة الدفع",
        DownPayment: "الدفعة الأولية",
        DuringConstructionM: "عدد أشهر الدفعات حتى التسليم",
        DuringConstructionPercentage: "نسبة الدفعات حتى التسليم",
        HandoverDate: "تاريخ التسليم",
        OnHandoverPercentage: "عند التسليم",
        NoOfPosthandoverMonths: "عدد الأشهر بعد التسليم",
        Posthandover: "بعد التسليم",
        PosthandoverPercentage: "نسبة الدفعات بعد التسليم",
        TotalInstallments: "العدد الكلي للدفعات",
        Installments: "الدفعات",
        PercentageOfPayment: "نسبة الدفعة",
        Amount: "المبلغ",
        Date: "التاريخ",
        TeamTitle: "تعرف على فريق آفا العقارية",
        TeamSubTitle:
          "تعرف على أعضاء الفريق الخاص بآفا العقارية و المساهم في نجاحنا",
        NoMembers: "لم يتم إضافة أعضاء",
        SearchForAJob: "بحث عن شاغر",
        JoinOurTeam: "إنضم لفريقنا",
        NoJobs: "لا يوجد أية شواغر حاليا",
        MoreDetails: "تفاصيل أكثر",
        Apply: "تقديم",
        EXPIRED: "منتهي الصلاحية",
        ArticleHeader: "تعرف على آخر مقالاتنا و أخبارنا",
        SearchForAnArticle: "بحث عن مقال",
        NoArticles: "لا يوجد أية مقال حالياً",
        MinRead: "دقيقة قراءة",
        ReadMore: "إقرأ المزيد",
        SearchForProperty: "إبحث عن عقار",
        NoCategories: "لا يوجد أية فئات ",
        Category: "الفئات",
        BathroomsNumber: "عدد الحمامات",
        Find: "إبحث",
        Properties: "العقارات",
        Articles: "المقالات",
        Jobs: "فرص العمل",
        Services: "الخدمات",
        ListWithUs: "أضف عقارك معنا",
        Enquiry: "استفسر عن عقار",
        ContactUs: "اتصل بنا",
        TryAgain: "حصل خطأ ما, يرجى إعادة المحاولة",
        EnquiryThanks: "شكرا لتواصلك معنا",
        PersonalInformation: "المعلومات الشخصية",
        FeedbackThanks: "شکرا لتعليقك, سنقوم بالرد عليكم بأقرب وقت ممكن",
        ListingThanks:
          "شكرا لإضافة عقاركم معنا, سنقوم بالرد عليكم بأقرب وقت ممكن",
        UploadPhoto: "تحميل الصور",
        DeleteAll: "حذف جميع الصور",
        HomePropertiesTitle: "أحدث العقارات المضافة",
        Addresses: "أهم العقارات حسب المنطقة",
        SeeMore: "المزيد",
        Currency: " تعديل العملة",
        AriaUnit: "تعديل المساحة",
        Units: "الوحدات",
        ListingTitle: "قم بعرض عقارك للبيع او الإيجار معنا",
        ContactUsTitle: "سعيدون بالتواصل معكم",
        EnquiryTitle: "استفسر عن العقار الذي تتمناه",
        ContactInformation: "معلومات التواصل",
        OfficeAddress:
          "مكتب رقم 609 - مبنى كلوفر باي - شارع 6أ د. مراسي - الخليج التجاري - دبي",
        AvaEmail: "info@avarealestate.ae",
        SocialMedia: "وسائل التواصل الاجتماعي",
        PrivacyPolicy: " سياسة الخصوصية",
        TermsConditions: "البنود و الشروط",
        SiteMap: "خريطة الموقع",
        Studio: "استوديو",
        LocationAndNearby: "الموقع و ما حوله",
        EstimatedRent: "متوسط سعر الإيجار",
        searchPlace: "ابحث عن عنوان",
      },
    },
    en: {
      translation: {
        English: "English",
        Arabic: "العربية",
        Persian: "فارسی",
        code: "En",
        Home: "Home",
        exit: "Exit",
        cancel: "Cancel",
        ok: "Ok",
        menu: "Menu",
        register: "Register Now",
        download: "Download",
        formFullName: "Full Name",
        formPhoneNumber: "Phone Number",
        formEmail: "Email",
        AboutUs: "About Us",
        JoinUs: "Join Us",
        send: "Send",
        sending: "Sending...",
        Location: "Location",
        Type: "Type",
        Bedrooms: "Bedrooms",
        MinPrice: "Minimum Price",
        MaxPrice: "Maximum Price",
        Message: "Message",
        Subject: "Subject",
        Gender: "Gender",
        Purpose: "Purpose",
        Balconey: "Balconey",
        Price: "Price",
        PropertyTitle: "Property Title",
        PropertyDescription: "Property Description",
        ErrorPleaseReload: " Somthing went wrong, Please reload the page!",
        NoProperties: "There Are No Properties Yet!",
        Search: "Search",
        Loading: "Loading...",
        Size: "Size",
        All: "All",
        Bathrooms: "Bathrooms",
        Clear: "Clear",
        Filter: "Filter",
        PricePer: "Price per",
        PriceOfUnit: "Price of unit",
        RegulatoryInformation: "Regulatory Information",
        PermitNumber: "Permit Number",
        DEDNo: "DED No",
        ReraNo: "Rera No",
        BRNNo: "BRN No",
        FindMore: "Find More",
        AdvantagesServices: "Advantages and services",
        Description: "Description",
        PropertyInformation: "Property Information",
        Address: "Property Based on Location",
        AddedOn: "Added On",
        Completion: "Completion Status",
        RentFrequency: "Rent Frequency",
        MinimumNumberOfChecks: "Minimum Number Of Checks",
        MaximumNumberOfChecks: "Maximum Number Of Checks",
        Handover: "Handover",
        VacantStatus: "Vacant Status",
        Developer: "Developer",
        PaymentPlan: "Payment Plan",
        DownPayment: "Down Payment",
        DuringConstructionM: "During Construction /M",
        DuringConstructionPercentage: "During Construction %",
        HandoverDate: "Handover Date",
        OnHandoverPercentage: "On Handover %",
        NoOfPosthandoverMonths: "Post Handover No /M",
        Posthandover: "Post handover",
        PosthandoverPercentage: "Post Handover %",
        TotalInstallments: "Total Installments",
        Installments: "Installments",
        PercentageOfPayment: "Percentage Of Payment",
        Amount: "Amount",
        Date: "Date",
        TeamTitle: "Find out who is behind AVA realestate",
        TeamSubTitle:
          "AVA Real Estate is powered by a dynamic team of visionary Agents, Software developer, and marketing teams. Uncover the driving forces shaping AVA Real Estate's success.",
        NoMembers: "No Members To View",
        SearchForAJob: "Search for a job",
        JoinOurTeam: "Join Our Team",
        NoJobs: "There Are No Jobs Yet!",
        MoreDetails: "More Details",
        Apply: "Apply",
        EXPIRED: "EXPIRED",
        ArticleHeader: "Read Our Latest Artilces and News",
        SearchForAnArticle: "Search for an article",
        NoArticles: "There Are No Articles Yet!",
        MinRead: "Minutes Read",
        ReadMore: "Read More",
        SearchForProperty: "Search For Property",
        NoCategories: "No categories yet",
        Category: "Category",
        BathroomsNumber: "Bathrooms Number",
        Find: "Find",
        Properties: "Properties",
        Articles: "Articles",
        Jobs: "Jobs",
        Services: "Services",
        ListWithUs: "List With Us",
        Enquiry: "Enquiry",
        ContactUs: "Contact Us",
        TryAgain: "Somthing Went Wrong, Please Try Again",
        EnquiryThanks: "Thank you for your Enquiry",
        PersonalInformation: "Personal Information",
        FeedbackThanks: "Thank you for your Feedback",
        ListingThanks: "Thank you for your Listing With Us",
        UploadPhoto: "Upload Photos",
        DeleteAll: "Delete All",
        HomePropertiesTitle: "Buying Properties in Dubai",
        Addresses: "Addresses",
        SeeMore: "See More",
        Currency: "Currency",
        AriaUnit: "Area Unit",
        Units: "Units",
        ListingTitle: "Share Your Apartment For Sale/Rent With Us",
        ContactUsTitle: "We Are Happy To Hear From You",
        EnquiryTitle: "Make A Request For The Apartment You Desire",
        ContactInformation: "Contact Information",
        OfficeAddress:
          "Office 609, Clover Bay Tower - 6a Marasi Dr - Business Bay - Dubai",
        AvaEmail: "info@avarealestate.ae",
        SocialMedia: "Social Media",
        PrivacyPolicy: " Privacy Policy",
        TermsConditions: "Terms & Conditions",
        SiteMap: "Site Map",
        Studio: "Studio",
        LocationAndNearby: "Location & Nearby",
        EstimatedRent: "Estimated Rent",
        searchPlace: "Search For A Place",
      },
    },
  },
  lng: lnglocal ?? "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
